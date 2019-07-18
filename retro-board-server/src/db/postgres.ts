import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { SessionRepository } from './repositories';
import { Post } from './entities';
import { Session as JsonSession } from 'retro-board-common/src/types';
import { Store } from '../types';
import getOrmConfig from './orm-config';

export async function getDb() {
  const connection = await createConnection(getOrmConfig());
  return connection;
}

const get = (_: Connection, sessionRepository: SessionRepository) => async (
  sessionId: string
) => {
  try {
    const session = await sessionRepository.findOne({ id: sessionId });
    if (session) {
      const postRepository = await _.getRepository(Post);
      const posts = await postRepository.find({
        where: { session },
        order: { created: 'ASC' },
      });
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

const set = (_: Connection, sessionRepository: SessionRepository) => async (
  session: JsonSession
) => {
  await sessionRepository.save(session);
};

export default async function db(): Promise<Store> {
  const connection = await getDb();
  const sessionRepository = await connection.getCustomRepository(
    SessionRepository
  );
  return {
    set: set(connection, sessionRepository),
    get: get(connection, sessionRepository),
  };
}
