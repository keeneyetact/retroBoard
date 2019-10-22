import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { SessionRepository, PostRepository } from './repositories';
import {
  Session as JsonSession,
  Post as JsonPost,
  SessionOptions,
} from 'retro-board-common';
import { Store } from '../types';
import getOrmConfig from './orm-config';

export async function getDb() {
  const connection = await createConnection(getOrmConfig());
  return connection;
}

const create = (sessionRepository: SessionRepository) => async (
  id: string,
  options: SessionOptions
) => {
  try {
    const session = await sessionRepository.findOne({ id });
    if (!session) {
      await sessionRepository.saveFromJson({
        id,
        name: '',
        posts: [],
        ...options,
      });
    }
  } catch (err) {
    throw err;
  }
};

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
        // TODO
        allowActions: true,
        allowMultipleVotes: false,
        allowSelfVoting: false,
        maxDownVotes: null,
        maxUpVotes: null,
        ideasLabel: null,
        notWellLabel: null,
        wellLabel: null,
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
    create: create(sessionRepository),
  };
}
