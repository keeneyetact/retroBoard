import { EntityRepository, Repository } from 'typeorm';
import { SessionEntity, PostEntity } from '../entities';
import SessionRepository from './SessionRepository';
import { Post as JsonPost, defaultSession } from '@retrospected/common';
import { cloneDeep } from 'lodash';

@EntityRepository(PostEntity)
export default class PostRepository extends Repository<PostEntity> {
  async updateFromJson(sessionId: string, post: JsonPost) {
    await this.save({
      ...cloneDeep(post),
      session: {
        id: sessionId,
      },
      votes: undefined,
      user: {
        id: post.user.id,
      },
      group: post.group
        ? {
            id: post.group.id,
          }
        : null,
    });
  }
  async saveFromJson(
    sessionId: string,
    userId: string,
    post: JsonPost
  ): Promise<void> {
    const session = await this.manager.findOne(SessionEntity, sessionId);
    if (session) {
      await this.save({
        ...cloneDeep(post),
        user: {
          id: userId,
        },
        session: {
          id: sessionId,
        },
        group: post.group
          ? {
              id: post.group.id,
            }
          : null,
      });
    } else {
      const sessionRepository = this.manager.getCustomRepository(
        SessionRepository
      );
      const newSession = {
        ...defaultSession,
        id: sessionId,
      };
      await sessionRepository.saveFromJson(newSession, userId);
      await this.saveFromJson(sessionId, userId, cloneDeep(post));
    }
  }
}
