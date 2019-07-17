import { EntityRepository, Repository } from 'typeorm';
import { Session } from '../entities';
import { Session as JsonSession } from 'retro-board-common/src/types';

@EntityRepository(Session)
export default class SessionRepository extends Repository<Session> {
  async saveFromJson(session: JsonSession) {
    await this.save(session);
  }
}
