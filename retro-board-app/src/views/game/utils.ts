import { Post, VoteType } from 'retro-board-common';

export function countVotes(post: Post, type: VoteType) {
  return post.votes.filter(v => v.type === type).length;
}
