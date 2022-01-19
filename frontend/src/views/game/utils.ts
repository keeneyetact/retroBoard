import { Post, VoteType, PostGroup } from 'common';
import groupBy from 'lodash/groupBy';
import toPairs from 'lodash/toPairs';
import sum from 'lodash/sum';

export function countVotes(post: Post, type: VoteType): number {
  return post.votes.filter((v) => v.type === type).length;
}

export function countVotesForGroup(group: PostGroup, type: VoteType): number {
  return sum(group.posts.map((p) => countVotes(p, type)));
}

export interface VoteEnumeration {
  name: string;
  count: number;
}

export function enumerateVotes(post: Post, type: VoteType): VoteEnumeration[] {
  return toPairs(
    groupBy(
      post.votes.filter((v) => v.type === type),
      (v) => v.userName
    )
  ).map((pair) => ({
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
