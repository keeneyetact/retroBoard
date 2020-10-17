import React from 'react';
import { FullUser } from 'retro-board-common';

interface UserContextProps {
  user: FullUser | null;
  initialised: boolean;
  setUser: (user: FullUser | null) => void;
}

const UserContext = React.createContext<UserContextProps>({
  user: null,
  initialised: false,
  setUser: (_: FullUser | null) => {},
});

export default UserContext;
