import { EntityRepository, Repository } from 'typeorm';
import { Vote } from '../entities';
import { Vote as JsonVote } from 'retro-board-common';

@EntityRepository(Vote)
export default class VoteRepository extends Repository<Vote> {
  async saveFromJson(
    postId: string,
    userId: string,
    vote: JsonVote
  ): Promise<void> {
    await this.save({ ...vote, post: { id: postId }, user: { id: userId } });
  }
}
