import { EntityRepository, Repository } from 'typeorm';
import { PostGroupEntity } from '../entities';
import { PostGroup as JsonPostGroup } from 'retro-board-common/src/types';

@EntityRepository(PostGroupEntity)
export default class PostGroupRepository extends Repository<PostGroupEntity> {
  async saveFromJson(
    sessionId: string,
    authorId: string,
    group: Omit<JsonPostGroup, 'createdBy'>
  ): Promise<JsonPostGroup> {
    const groupWithoutPosts = {
      ...group,
      session: { id: sessionId },
      createdBy: { id: authorId },
    };
    delete groupWithoutPosts.posts;

    const createdPostGroup = await this.save(groupWithoutPosts);

    return {
      ...createdPostGroup,
      posts: [],
    };
  }
}
