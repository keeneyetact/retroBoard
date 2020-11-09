import {
  UserEntity,
  PostEntity,
  PostGroupEntity,
  ColumnDefinitionEntity,
  SessionEntity,
  SessionTemplateEntity,
} from '../entities';
import {
  Session,
  defaultSession,
  ColumnDefinition,
  SessionOptions,
  SessionMetadata,
  VoteType,
} from 'retro-board-common';
import shortId from 'shortid';
import { v4 } from 'uuid';
import { uniqBy, flattenDeep } from 'lodash';
import { Connection } from 'typeorm';
import {
  UserRepository,
  SessionRepository,
  SessionTemplateRepository,
  PostRepository,
  PostGroupRepository,
  ColumnRepository,
} from '../repositories';

export async function createSession(
  connection: Connection,
  author: UserEntity,
  encryptionCheck?: string
): Promise<Session> {
  const userRepository = connection.getCustomRepository(UserRepository);
  const sessionRepository = connection.getCustomRepository(SessionRepository);
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
          encrypted: encryptionCheck || null,
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
          encrypted: encryptionCheck || null,
        },
        author.id
      );
      return newSession;
    }
  } catch (err) {
    throw err;
  }
}

export async function createCustom(
  connection: Connection,
  options: SessionOptions,
  columns: ColumnDefinition[],
  setDefault: boolean,
  author: UserEntity
): Promise<Session> {
  const userRepository = connection.getCustomRepository(UserRepository);
  const sessionRepository = connection.getCustomRepository(SessionRepository);
  const templateRepository = connection.getCustomRepository(
    SessionTemplateRepository
  );
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
}

export async function getSession(
  connection: Connection,
  sessionId: string
): Promise<Session | null> {
  const postRepository = connection.getCustomRepository(PostRepository);
  const postGroupRepository = connection.getCustomRepository(
    PostGroupRepository
  );
  const sessionRepository = connection.getCustomRepository(SessionRepository);
  const columnRepository = connection.getCustomRepository(ColumnRepository);

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
}

export async function saveSession(
  connection: Connection,
  userId: string,
  session: Session
): Promise<void> {
  const sessionRepository = connection.getCustomRepository(SessionRepository);
  await sessionRepository.saveFromJson(session, userId);
}

export async function deleteSessions(
  connection: Connection,
  userId: string,
  sessionId: string
): Promise<boolean> {
  const sessionRepository = connection.getCustomRepository(SessionRepository);
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
}

function numberOfVotes(type: VoteType, session: SessionEntity) {
  return session.posts!.reduce<number>((prev, cur) => {
    return prev + cur.votes!.filter((v) => v.type === type).length;
  }, 0);
}

function numberOfActions(session: SessionEntity) {
  return session.posts!.filter((p) => p.action !== null).length;
}

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

export async function previousSessions(
  connection: Connection,
  userId: string
): Promise<SessionMetadata[]> {
  const sessionRepository = connection.getCustomRepository(SessionRepository);
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
        encrypted: session.encrypted,
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
}

export async function getDefaultTemplate(
  connection: Connection,
  id: string
): Promise<SessionTemplateEntity | null> {
  const userRepository = connection.getCustomRepository(UserRepository);
  const userWithDefaultTemplate = await userRepository.findOne(
    { id },
    { relations: ['defaultTemplate', 'defaultTemplate.columns'] }
  );
  return userWithDefaultTemplate?.defaultTemplate || null;
}

export async function updateOptions(
  connection: Connection,
  session: Session,
  options: SessionOptions
): Promise<SessionOptions> {
  const sessionRepository = connection.getCustomRepository(SessionRepository);
  return await sessionRepository.updateOptions(session, options);
}

export async function updateColumns(
  connection: Connection,
  session: Session,
  columns: ColumnDefinition[]
): Promise<ColumnDefinition[]> {
  const columnRepository = connection.getCustomRepository(ColumnRepository);
  return await columnRepository.updateColumns(session, columns);
}
