import { Post, Session, User } from 'retro-board-common';
import { some } from 'lodash';

export interface UserPermissions {
  canUpVote: boolean;
  canDownVote: boolean;
  canCreateAction: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

export function permissionLogic(
  post: Post,
  session: Session,
  user: User | null
): UserPermissions {
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
    (!allowMultipleVotes && some(post.likes, u => u.id === userId)) ||
    (!allowMultipleVotes && some(post.dislikes, u => u.id === userId)) ||
    !canPotentiallyVote;
  const upVotes = numberOfVotes('likes', userId, session);
  const downVotes = numberOfVotes('dislikes', userId, session);
  const hasMaxedUpVotes = maxUpVotes === null ? false : upVotes >= maxUpVotes;
  const hasMaxedDownVotes =
    maxDownVotes === null ? false : downVotes >= maxDownVotes;
  const canUpVote = !hasVotedOrAuthor && !hasMaxedUpVotes;
  const canDownVote = !hasVotedOrAuthor && !hasMaxedDownVotes;
  const canEdit = isAuthor;
  const canDelete = isAuthor;

  return {
    canCreateAction,
    canDownVote,
    canUpVote,
    canEdit,
    canDelete,
  };
}

function numberOfVotes(
  type: 'likes' | 'dislikes',
  userId: string | number,
  session: Session
) {
  return session.posts.reduce<number>((prev, cur) => {
    return prev + cur[type].filter(v => v.id === userId).length;
  }, 0);
}
