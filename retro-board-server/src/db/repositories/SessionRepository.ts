import { EntityRepository, Repository, getConnection } from 'typeorm';
import { Session } from '../entities';
import { Session as JsonSession } from 'retro-board-common/src/types';

@EntityRepository(Session)
export default class SessionRepository extends Repository<Session> {
  async saveFromJson(session: JsonSession): Promise<void> {
    const sessionWithoutPosts = {
      ...session,
    };
    delete sessionWithoutPosts.posts;

    await this.save(sessionWithoutPosts);
  }
}
