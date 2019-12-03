import { Post, VoteType } from 'retro-board-common';
import { groupBy, toPairs } from 'lodash';

export function countVotes(post: Post, type: VoteType) {
  return post.votes.filter(v => v.type === type).length;
}

export interface VoteEnumeration {
  name: string;
  count: number;
}

export function enumerateVotes(post: Post, type: VoteType): VoteEnumeration[] {
  return toPairs(
    groupBy(
      post.votes.filter(v => v.type === type),
      v => v.user.name
    )
  ).map(pair => ({
    name: pair[0],
    count: pair[1].length,
  }));
}

export function sortPostByVote(a: Post, b: Post): number {
  const scoreA = countVotes(a, 'like') - countVotes(a, 'dislike');
  const scoreB = countVotes(b, 'like') - countVotes(b, 'dislike');
  if (scoreA === scoreB) {
    return 0;
  }

  return scoreA < scoreB ? 1 : -1;
}
