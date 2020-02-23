import React from 'react';
import { User } from 'retro-board-common';

interface UserContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = React.createContext<UserContextProps>({
    user: null,
    setUser: (_: User | null) => { },
});

export default UserContext;
