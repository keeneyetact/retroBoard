import 'reflect-metadata';
import { flattenDeep, uniqBy } from 'lodash';
import { createConnection, Connection } from 'typeorm';
import {
  SessionRepository,
  PostRepository,
  PostGroupRepository,
  ColumnRepository,
  VoteRepository,
  UserRepository,
  SessionTemplateRepository,
} from './repositories';
import {
  Session,
  Post,
  PostGroup,
  Vote,
  ColumnDefinition,
  SessionMetadata,
  SessionOptions,
  defaultSession,
  VoteType,
  User,
  FullUser,
} from 'retro-board-common';
import { Store } from '../types';
import getOrmConfig from './orm-config';
import shortId from 'shortid';
import { v4 } from 'uuid';
import {
  SessionTemplateEntity,
  SessionEntity,
  PostEntity,
  PostGroupEntity,
  ColumnDefinitionEntity,
} from './entities';
import UserEntity, { ALL_FIELDS } from './entities/User';

export async function getDb() {
  const connection = await createConnection(getOrmConfig());
  return connection;
}

const create = (
  sessionRepository: SessionRepository,
  userRepository: UserRepository
) => async (author: User): Promise<Session> => {
  try {
    const id = shortId();
    const userWithDefaultTemplate = await userRepository.findOne(
      { id: author.id },
      { relations: ['defaultTemplate', 'defaultTemplate.columns'] }
    );
    if (userWithDefaultTemplate?.defaultTemplate) {
      const template = userWithDefaultTemplate.defaultTemplate;
      const newSession = await sessionRepository.saveFromJson(
        {
          ...defaultSession,
          id,
          options: { ...template.options },
          columns: template.columns!.map(
            (c) =>
              ({
                ...c,
                id: v4(),
                author: { id: author.id },
              } as ColumnDefinition)
          ),
        },
        author.id
      );
      return newSession;
    } else {
      const newSession = await sessionRepository.saveFromJson(
        {
          ...defaultSession,
          columns: defaultSession.columns.map((c) => ({
            ...c,
            id: v4(),
          })),
          id,
        },
        author.id
      );
      return newSession;
    }
  } catch (err) {
    throw err;
  }
};

const createCustom = (
  sessionRepository: SessionRepository,
  templateRepository: SessionTemplateRepository,
  userRepository: UserRepository
) => async (
  options: SessionOptions,
  columns: ColumnDefinition[],
  setDefault: boolean,
  author: User
): Promise<Session> => {
  try {
    const id = shortId();
    const session = await sessionRepository.findOne({ id });
    if (!session) {
      const newSession = await sessionRepository.saveFromJson(
        {
          ...defaultSession,
          id,
          options,
          columns,
        },
        author.id
      );

      if (setDefault) {
        const defaultTemplate = await templateRepository.saveFromJson(
          'Default Template',
          columns,
          options,
          author.id
        );
        await userRepository.persistTemplate(author.id, defaultTemplate.id);
      }

      return newSession;
    }
  } catch (err) {
    throw err;
  }
  throw Error('The session already exists');
};

const getSession = (
  sessionRepository: SessionRepository,
  postRepository: PostRepository,
  postGroupRepository: PostGroupRepository,
  columnRepository: ColumnRepository
) => async (_: string | null, sessionId: string): Promise<Session | null> => {
  try {
    const session = await sessionRepository.findOne({ id: sessionId });
    if (session) {
      const posts = (await postRepository.find({
        where: { session },
        order: { created: 'ASC' },
      })) as PostEntity[];
      const groups = (await postGroupRepository.find({
        where: { session },
        order: { created: 'ASC' },
      })) as PostGroupEntity[];
      const columns = (await columnRepository.find({
        where: { session },
        order: { index: 'ASC' },
      })) as ColumnDefinitionEntity[];
      return {
        ...session.toJson(),
        columns: columns.map((c) => c.toJson()),
        posts: posts.map((p) => p.toJson()),
        groups: groups.map((g) => g.toJson()),
      };
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

const getUser = (userRepository: UserRepository) => async (
  id: string
): Promise<UserEntity | null> => {
  const user = await userRepository.findOne(id, { select: ALL_FIELDS });
  return user || null;
};

const getUserByUsername = (userRepository: UserRepository) => async (
  username: string
): Promise<UserEntity | null> => {
  const user = await userRepository.findOne(
    { username },
    { select: ALL_FIELDS }
  );
  return user || null;
};

const getDefaultTemplate = (userRepository: UserRepository) => async (
  id: string
): Promise<SessionTemplateEntity | null> => {
  const userWithDefaultTemplate = await userRepository.findOne(
    { id },
    { relations: ['defaultTemplate', 'defaultTemplate.columns'] }
  );
  return userWithDefaultTemplate?.defaultTemplate || null;
};

const updateUser = (userRepository: UserRepository) => async (
  id: string,
  updatedUser: Partial<UserEntity>
): Promise<UserEntity | null> => {
  const user = await userRepository.findOne(id);
  if (user) {
    await userRepository.update(id, updatedUser);
    const newUser = await userRepository.findOne(id, { select: ALL_FIELDS });
    return newUser || null;
  }
  return null;
};

const saveSession = (sessionRepository: SessionRepository) => async (
  userId: string,
  session: Session
): Promise<void> => {
  await sessionRepository.saveFromJson(session, userId);
};

const updateOptions = (sessionRepository: SessionRepository) => async (
  session: Session,
  options: SessionOptions
): Promise<SessionOptions> => {
  return await sessionRepository.updateOptions(session, options);
};

const updateColumns = (columnRepository: ColumnRepository) => async (
  session: Session,
  columns: ColumnDefinition[]
): Promise<ColumnDefinition[]> => {
  return await columnRepository.updateColumns(session, columns);
};

const savePost = (postRepository: PostRepository) => async (
  userId: string,
  sessionId: string,
  post: Post
): Promise<void> => {
  await postRepository.saveFromJson(sessionId, userId, post);
};

const savePostGroup = (postGroupRepository: PostGroupRepository) => async (
  userId: string,
  sessionId: string,
  group: PostGroup
): Promise<void> => {
  await postGroupRepository.saveFromJson(sessionId, userId, group);
};

const saveVote = (voteRepository: VoteRepository) => async (
  userId: string,
  sessionId: string,
  postId: string,
  vote: Vote
): Promise<void> => {
  await voteRepository.saveFromJson(postId, userId, vote);
};

const deletePost = (postRepository: PostRepository) => async (
  userId: string,
  _: string,
  postId: string
): Promise<void> => {
  await postRepository.delete({ id: postId, user: { id: userId } });
};

const deletePostGroup = (postGroupRepository: PostGroupRepository) => async (
  userId: string,
  _: string,
  groupId: string
): Promise<void> => {
  await postGroupRepository.delete({ id: groupId, user: { id: userId } });
};

const getOrSaveUser = (userRepository: UserRepository) => async (
  user: UserEntity
): Promise<UserEntity> => {
  const existingUser = await userRepository.findOne({
    where: { username: user.username, accountType: user.accountType },
  });
  if (existingUser) {
    return existingUser;
  }
  return await userRepository.save(user);
};

const updateName = (sessionRepository: SessionRepository) => async (
  sessionId: string,
  name: string
): Promise<void> => {
  await sessionRepository.updateName(sessionId, name);
};

const deleteSessions = (sessionRepository: SessionRepository) => async (
  userId: string,
  sessionId: string
): Promise<boolean> => {
  const session = await sessionRepository.findOne(sessionId);
  if (!session) {
    console.info('Session not found', sessionId);
    return false;
  }
  if (
    session.createdBy.id !== userId ||
    session.createdBy.accountType === 'anonymous'
  ) {
    console.error(
      'The user is not the one who created the session, or is anonymous'
    );
    return false;
  }
  await sessionRepository.query(`delete from posts where "sessionId" = $1;`, [
    sessionId,
  ]);
  await sessionRepository.query(`delete from columns where "sessionId" = $1;`, [
    sessionId,
  ]);
  await sessionRepository.query(`delete from groups where "sessionId" = $1;`, [
    sessionId,
  ]);
  await sessionRepository.query(`delete from sessions where id = $1;`, [
    sessionId,
  ]);

  return true;
};

const previousSessions = (sessionRepository: SessionRepository) => async (
  userId: string
): Promise<SessionMetadata[]> => {
  const ids: number[] = await sessionRepository.query(
    `
  (
		select distinct id from sessions where "createdById" = $1
	)
	union
	(
		select distinct sessions.id from sessions 
		left join posts on sessions.id = posts."sessionId"
		where posts."userId" = $1
	)
	union
	(
		select distinct sessions.id from sessions 
		left join posts on sessions.id = posts."sessionId"
		left join votes on posts.id = votes."userId"
		where votes."userId" = $1
	)
  `,
    [userId]
  );

  const sessions = await sessionRepository.findByIds(ids, {
    relations: ['posts', 'posts.votes'],
    order: { created: 'DESC' },
  });

  return sessions.map(
    (session) =>
      ({
        created: session.created,
        createdBy: session.createdBy.toJson(),
        id: session.id,
        name: session.name,
        numberOfNegativeVotes: numberOfVotes('dislike', session),
        numberOfPositiveVotes: numberOfVotes('like', session),
        numberOfPosts: session.posts?.length,
        numberOfActions: numberOfActions(session),
        participants: getParticipants(session),
        canBeDeleted:
          userId === session.createdBy.id &&
          session.createdBy.accountType !== 'anonymous',
      } as SessionMetadata)
  );
};

function getParticipants(session: SessionEntity) {
  return uniqBy(
    [
      session.createdBy.toJson(),
      ...session.posts!.map((p) => p.user.toJson()),
      ...flattenDeep(
        session.posts!.map((p) => p.votes!.map((v) => v.user.toJson()))
      ),
    ].filter(Boolean),
    (u) => u.id
  );
}

function numberOfVotes(type: VoteType, session: SessionEntity) {
  return session.posts!.reduce<number>((prev, cur) => {
    return prev + cur.votes!.filter((v) => v.type === type).length;
  }, 0);
}

function numberOfActions(session: SessionEntity) {
  return session.posts!.filter((p) => p.action !== null).length;
}

export default async function db(): Promise<Store> {
  const connection = await getDb();
  const sessionRepository = connection.getCustomRepository(SessionRepository);
  const postRepository = connection.getCustomRepository(PostRepository);
  const postGroupRepository = connection.getCustomRepository(
    PostGroupRepository
  );
  const columnRepository = connection.getCustomRepository(ColumnRepository);
  const voteRepository = connection.getCustomRepository(VoteRepository);
  const userRepository = connection.getCustomRepository(UserRepository);
  const templateRepository = connection.getCustomRepository(
    SessionTemplateRepository
  );
  return {
    getSession: getSession(
      sessionRepository,
      postRepository,
      postGroupRepository,
      columnRepository
    ),
    getUser: getUser(userRepository),
    getUserByUsername: getUserByUsername(userRepository),
    saveSession: saveSession(sessionRepository),
    updateOptions: updateOptions(sessionRepository),
    updateColumns: updateColumns(columnRepository),
    savePost: savePost(postRepository),
    savePostGroup: savePostGroup(postGroupRepository),
    saveVote: saveVote(voteRepository),
    deletePost: deletePost(postRepository),
    deletePostGroup: deletePostGroup(postGroupRepository),
    getOrSaveUser: getOrSaveUser(userRepository),
    updateUser: updateUser(userRepository),
    create: create(sessionRepository, userRepository),
    createCustom: createCustom(
      sessionRepository,
      templateRepository,
      userRepository
    ),
    previousSessions: previousSessions(sessionRepository),
    getDefaultTemplate: getDefaultTemplate(userRepository),
    deleteSession: deleteSessions(sessionRepository),
    updateName: updateName(sessionRepository),
  };
}
