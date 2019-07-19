import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { SessionRepository, PostRepository } from './repositories';
import { Session as JsonSession, Post as JsonPost } from 'retro-board-common';
import { Store } from '../types';
import getOrmConfig from './orm-config';

export async function getDb() {
  const connection = await createConnection(getOrmConfig());
  return connection;
}

const get = (
  sessionRepository: SessionRepository,
  postRepository: PostRepository
) => async (sessionId: string): Promise<JsonSession> => {
  try {
    const session = await sessionRepository.findOne({ id: sessionId });
    if (session) {
      const posts = (await postRepository.find({
        where: { session },
        order: { created: 'ASC' },
      })) as JsonPost[];
      return {
        ...session,
        posts,
      };
    } else {
      return {
        id: sessionId,
        name: null,
        posts: [],
      };
    }
  } catch (err) {
    throw err;
  }
};

const saveSession = (sessionRepository: SessionRepository) => async (
  session: JsonSession
): Promise<void> => {
  await sessionRepository.saveFromJson(session);
};

const savePost = (postRepository: PostRepository) => async (
  sessionId: string,
  post: JsonPost
): Promise<void> => {
  await postRepository.saveFromJson(sessionId, post);
};

const deletePost = (postRepository: PostRepository) => async (
  _: string,
  postId: string
): Promise<void> => {
  await postRepository.delete({ id: postId });
};

export default async function db(): Promise<Store> {
  const connection = await getDb();
  const sessionRepository = await connection.getCustomRepository(
    SessionRepository
  );
  const postRepository = await connection.getCustomRepository(PostRepository);
  return {
    get: get(sessionRepository, postRepository),
    saveSession: saveSession(sessionRepository),
    savePost: savePost(postRepository),
    deletePost: deletePost(postRepository),
  };
}
