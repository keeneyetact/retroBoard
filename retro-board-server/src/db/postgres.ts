import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import {
  SessionRepository,
  PostRepository,
  ColumnRepository,
  VoteRepository,
  UserRepository,
  SessionTemplateRepository,
} from './repositories';
import {
  Session as JsonSession,
  Post as JsonPost,
  Vote as JsonVote,
  User as JsonUser,
  ColumnDefinition as JsonColumnDefintion,
  SessionOptions,
  defaultSession,
  defaultOptions,
} from 'retro-board-common';
import { Store } from '../types';
import getOrmConfig from './orm-config';
import shortId from 'shortid';
import { SessionTemplate } from './entities';

export async function getDb() {
  const connection = await createConnection(getOrmConfig());
  return connection;
}

const create = (
  sessionRepository: SessionRepository,
  userRepository: UserRepository
) => async (author: JsonUser): Promise<JsonSession> => {
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
            c => ({ ...c, author: { id: author.id } } as JsonColumnDefintion)
          ),
        },
        author.id
      );
      return newSession;
    } else {
      const newSession = await sessionRepository.saveFromJson(
        {
          ...defaultSession,
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
  columns: JsonColumnDefintion[],
  setDefault: boolean,
  author: JsonUser
): Promise<JsonSession> => {
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
  columnRepository: ColumnRepository
) => async (
  _: string | null,
  sessionId: string
): Promise<JsonSession | null> => {
  try {
    const session = await sessionRepository.findOne({ id: sessionId });
    if (session) {
      const posts = (await postRepository.find({
        where: { session },
        order: { created: 'ASC' },
      })) as JsonPost[];
      const columns = (await columnRepository.find({
        where: { session },
        order: { index: 'ASC' },
      })) as JsonColumnDefintion[];
      return {
        ...session,
        columns,
        posts,
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
): Promise<JsonUser | null> => {
  const user = await userRepository.findOne(id);
  return user || null;
};

const getDefaultTemplate = (userRepository: UserRepository) => async (
  id: string
): Promise<SessionTemplate | null> => {
  const userWithDefaultTemplate = await userRepository.findOne(
    { id },
    { relations: ['defaultTemplate', 'defaultTemplate.columns'] }
  );
  return userWithDefaultTemplate?.defaultTemplate || null;
};

const updateUser = (userRepository: UserRepository) => async (
  id: string,
  updatedUser: Partial<JsonUser>
): Promise<JsonUser | null> => {
  const user = await userRepository.findOne(id);
  if (user) {
    await userRepository.update(id, updatedUser);
    const newUser = await userRepository.findOne(id);
    return newUser || null;
  }
  return null;
};

const saveSession = (sessionRepository: SessionRepository) => async (
  userId: string,
  session: JsonSession
): Promise<void> => {
  await sessionRepository.saveFromJson(session, userId);
};

const savePost = (postRepository: PostRepository) => async (
  userId: string,
  sessionId: string,
  post: JsonPost
): Promise<void> => {
  await postRepository.saveFromJson(sessionId, userId, post);
};

const saveVote = (voteRepository: VoteRepository) => async (
  userId: string,
  sessionId: string,
  postId: string,
  vote: JsonVote
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

const getOrSaveUser = (userRepository: UserRepository) => async (
  user: JsonUser
): Promise<JsonUser> => {
  const existingUser = await userRepository.findOne({
    where: { username: user.username, accountType: user.accountType },
  });
  if (existingUser) {
    return existingUser as JsonUser;
  }
  return await userRepository.saveFromJson(user);
};

const previousSessions = (sessionRepository: SessionRepository) => async (
  userId: string
): Promise<JsonSession[]> => {
  const sessions = await sessionRepository
    .createQueryBuilder('session')
    .leftJoin('session.posts', 'posts')
    .leftJoin('posts.votes', 'votes')
    .where('session.createdBy.id = :id', { id: userId })
    .orWhere('posts.user.id = :id', { id: userId })
    .orWhere('votes.user.id = :id', { id: userId })
    .getMany();

  return sessions.map(
    session =>
      ({
        ...session,
      } as JsonSession)
  );
};

export default async function db(): Promise<Store> {
  const connection = await getDb();
  const sessionRepository = connection.getCustomRepository(SessionRepository);
  const postRepository = connection.getCustomRepository(PostRepository);
  const columnRepository = connection.getCustomRepository(ColumnRepository);
  const voteRepository = connection.getCustomRepository(VoteRepository);
  const userRepository = connection.getCustomRepository(UserRepository);
  const templateRepository = connection.getCustomRepository(
    SessionTemplateRepository
  );
  return {
    getSession: getSession(sessionRepository, postRepository, columnRepository),
    getUser: getUser(userRepository),
    saveSession: saveSession(sessionRepository),
    savePost: savePost(postRepository),
    saveVote: saveVote(voteRepository),
    deletePost: deletePost(postRepository),
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
  };
}
