import React, { useState, useEffect } from 'react';
import Context from './Context';
import { User } from 'retro-board-common';
import { me } from '../api';
import wait from '../utils/wait';

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    async function getUser() {
      await wait(3000); // TODO: remove this!!
      setUser(await me());
      setInitialised(true);
    }
    getUser();
  }, []);

  return (
    <Context.Provider value={{ setUser, user, initialised }}>
      {children}
    </Context.Provider>
  );
};

export default AuthProvider;
