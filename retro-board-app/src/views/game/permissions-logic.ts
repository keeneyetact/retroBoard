import { Post, Session, User, VoteType } from 'retro-board-common';
import { some } from 'lodash';

export interface UserPermissions {
  canUpVote: boolean;
  canDownVote: boolean;
  canCreateAction: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canShowAuthor: boolean;
}

export function permissionLogic(
  post: Post,
  session: Session | null,
  user: User | null
): UserPermissions {
  if (!session) {
    return {
      canCreateAction: false,
      canDelete: false,
      canDownVote: false,
      canEdit: false,
      canShowAuthor: false,
      canUpVote: false,
    };
  }
  const {
    maxDownVotes,
    maxUpVotes,
    allowActions,
    allowSelfVoting,
    allowMultipleVotes,
  } = session;

  const canCreateAction = allowActions;
  const userId = user ? user.id : -1;
  const isAuthor = user ? user.id === post.user.id : false;
  const canPotentiallyVote = allowSelfVoting ? true : !isAuthor;
  const hasVotedOrAuthor =
    (!allowMultipleVotes &&
      some(post.votes, u => u.user.id === userId && u.type === 'like')) ||
    (!allowMultipleVotes &&
      some(post.votes, u => u.user.id === userId && u.type === 'dislike')) ||
    !canPotentiallyVote;
  const upVotes = numberOfVotes('like', userId, session);
  const downVotes = numberOfVotes('dislike', userId, session);
  const hasMaxedUpVotes = maxUpVotes === null ? false : upVotes >= maxUpVotes;
  const hasMaxedDownVotes =
    maxDownVotes === null ? false : downVotes >= maxDownVotes;
  const canUpVote = !hasVotedOrAuthor && !hasMaxedUpVotes;
  const canDownVote = !hasVotedOrAuthor && !hasMaxedDownVotes;
  const canEdit = isAuthor;
  const canDelete = isAuthor;
  const canShowAuthor = session.allowAuthorVisible;

  return {
    canCreateAction,
    canDownVote,
    canUpVote,
    canEdit,
    canDelete,
    canShowAuthor,
  };
}

export function numberOfVotes(
  type: VoteType,
  userId: string | number,
  session: Session
) {
  return session.posts.reduce<number>((prev, cur) => {
    return (
      prev +
      cur.votes.filter(v => v.user.id === userId && v.type === type).length
    );
  }, 0);
}
