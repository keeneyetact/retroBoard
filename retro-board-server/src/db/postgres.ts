import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import {
  SessionRepository,
  PostRepository,
  ColumnRepository,
  VoteRepository,
  UserRepository,
} from './repositories';
import {
  Session as JsonSession,
  Post as JsonPost,
  Vote as JsonVote,
  User as JsonUser,
  ColumnDefinition as JsonColumnDefintion,
  SessionOptions,
  defaultSession,
} from 'retro-board-common';
import { Store } from '../types';
import getOrmConfig from './orm-config';
import shortId from 'shortid';

export async function getDb() {
  const connection = await createConnection(getOrmConfig());
  return connection;
}

const create = (sessionRepository: SessionRepository) => async (
  options: SessionOptions | null,
  columns: JsonColumnDefintion[] | null,
  author: JsonUser
): Promise<JsonSession> => {
  try {
    const id = shortId();
    const session = await sessionRepository.findOne({ id });
    if (!session) {
      return await sessionRepository.saveFromJson(
        {
          ...defaultSession,
          id,
          ...(options || {}),
          columns: columns || defaultSession.columns,
        },
        author.id
      );
    }
  } catch (err) {
    throw err;
  }
  throw Error('The session already existed');
};

const get = (
  sessionRepository: SessionRepository,
  postRepository: PostRepository,
  columnRepository: ColumnRepository
) => async (_: JsonUser, sessionId: string): Promise<JsonSession | null> => {
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

const saveSession = (sessionRepository: SessionRepository) => async (
  user: JsonUser,
  session: JsonSession
): Promise<void> => {
  await sessionRepository.saveFromJson(session, user.id);
};

const savePost = (postRepository: PostRepository) => async (
  user: JsonUser,
  sessionId: string,
  post: JsonPost
): Promise<void> => {
  await postRepository.saveFromJson(sessionId, user.id, post);
};

const saveVote = (voteRepository: VoteRepository) => async (
  user: JsonUser,
  sessionId: string,
  postId: string,
  vote: JsonVote
): Promise<void> => {
  await voteRepository.saveFromJson(postId, user.id, vote);
};

const deletePost = (postRepository: PostRepository) => async (
  user: JsonUser,
  _: string,
  postId: string
): Promise<void> => {
  await postRepository.delete({ id: postId, user: { id: user.id } });
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
  user: JsonUser
): Promise<JsonSession[]> => {
  const sessions = await sessionRepository
    .createQueryBuilder('session')
    .leftJoin('session.posts', 'posts')
    .leftJoin('posts.votes', 'votes')
    .where('session.createdBy.id = :id', { id: user.id })
    .orWhere('posts.user.id = :id', { id: user.id })
    .orWhere('votes.user.id = :id', { id: user.id })
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
  return {
    get: get(sessionRepository, postRepository, columnRepository),
    saveSession: saveSession(sessionRepository),
    savePost: savePost(postRepository),
    saveVote: saveVote(voteRepository),
    deletePost: deletePost(postRepository),
    // saveUser: saveUser(userRepository),
    getOrSaveUser: getOrSaveUser(userRepository),
    create: create(sessionRepository),
    previousSessions: previousSessions(sessionRepository),
  };
}
