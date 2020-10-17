import { useContext } from 'react';
import UserContext from './Context';
import { FullUser } from 'retro-board-common';

function useUser(): FullUser | null {
  const { user } = useContext(UserContext);

  return user;
}

export default useUser;
