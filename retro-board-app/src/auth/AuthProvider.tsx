import React, { useState, useEffect } from 'react';
import Context from './Context';
import { User } from 'retro-board-common';
import { me } from '../api';

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      setUser(await me());
    }
    getUser();
  }, []);

  return (
    <Context.Provider value={{ setUser, user }}>{children}</Context.Provider>
  );
};

export default AuthProvider;
