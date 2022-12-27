import { SessionEntity } from '../entities';
import ColumnRepository from './ColumnRepository';
import { Session as JsonSession, SessionOptions } from '../../common';
import { getBaseRepository, saveAndReload } from './BaseRepository';

export default getBaseRepository(SessionEntity).extend({
  async updateOptions(
    sessionId: string,
    options: SessionOptions
  ): Promise<SessionOptions | null> {
    try {
      await this.save({
        id: sessionId,
        options,
      });
      return options;
    } catch {
      return null;
    }
  },
  async updateName(sessionId: string, name: string) {
    const sessionEntity = await this.findOne({ where: { id: sessionId } });
    if (sessionEntity) {
      sessionEntity.name = name;
      await this.save(sessionEntity);
    }
  },
  async saveFromJson(
    session: Omit<JsonSession, 'createdBy'>,
    authorId: string
  ): Promise<JsonSession> {
    const sessionWithoutPosts = {
      ...session,
      posts: undefined,
      columns: undefined,
      createdBy: { id: authorId },
    };
    delete sessionWithoutPosts.posts;
    delete sessionWithoutPosts.columns;

    const columnsRepo = this.manager.withRepository(ColumnRepository);
    const createdSession = await saveAndReload(this, sessionWithoutPosts);
    for (let i = 0; i < session.columns.length; i++) {
      await columnsRepo.saveFromJson(session.columns[i], session.id);
    }

    return createdSession.toJson();
  },
});
