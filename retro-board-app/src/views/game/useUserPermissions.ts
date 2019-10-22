import useGlobalState from '../../state';
import { Post } from 'retro-board-common';
import { permissionLogic, UserPermissions } from './permissions-logic';

export function useUserPermissions(post: Post): UserPermissions {
  const { state } = useGlobalState();
  return permissionLogic(post, state.session, state.username);
}
