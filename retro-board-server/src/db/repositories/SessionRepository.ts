import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { Session } from '../entities';
import ColumnRepository from './ColumnRepository';
import { Session as JsonSession } from 'retro-board-common/src/types';

@EntityRepository(Session)
export default class SessionRepository extends Repository<Session> {
  async saveFromJson(session: JsonSession): Promise<void> {
    const sessionWithoutPosts = {
      ...session,
    };
    delete sessionWithoutPosts.posts;
    delete sessionWithoutPosts.columns;

    const columnsRepo = getCustomRepository(ColumnRepository);

    await this.save(sessionWithoutPosts);

    for (let i = 0; i < session.columns.length; i++) {
      await columnsRepo.saveFromJson(session.columns[i], session.id);
    }
  }
}
