import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { Session } from '../entities';
import ColumnRepository from './ColumnRepository';
import { Session as JsonSession } from 'retro-board-common/src/types';
import SessionOptions from '../entities/SessionOptions';

@EntityRepository(Session)
export default class SessionRepository extends Repository<Session> {
  async updateOptions(
    session: JsonSession,
    options: SessionOptions
  ): Promise<SessionOptions> {
    await this.save({
      ...session,
      options,
    });
    return options;
  }
  async updateName(sessionId: string, name: string) {
    const sessionEntity = await this.findOne(sessionId);
    if (sessionEntity) {
      sessionEntity.name = name;
      await this.save(sessionEntity);
    }
  }
  async saveFromJson(
    session: Omit<JsonSession, 'createdBy'>,
    authorId: string
  ): Promise<JsonSession> {
    const sessionWithoutPosts = {
      ...session,
      createdBy: { id: authorId },
    };
    delete sessionWithoutPosts.posts;
    delete sessionWithoutPosts.columns;

    const columnsRepo = getCustomRepository(ColumnRepository);
    const createdSession = await this.save(sessionWithoutPosts);

    for (let i = 0; i < session.columns.length; i++) {
      await columnsRepo.saveFromJson(session.columns[i], session.id);
    }

    return {
      ...createdSession,
      posts: [],
    };
  }
}
