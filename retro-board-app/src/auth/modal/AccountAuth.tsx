import React, { useState } from 'react';
import { FullUser } from 'retro-board-common';
import Login from './account/Login';
import Register from './account/Register';
import LostPassword from './account/LostPassword';

interface AccountAuthProps {
  onClose: () => void;
  onUser: (user: FullUser | null) => void;
}

type Mode = 'login' | 'register' | 'reset';

const AccountAuth = ({ onClose, onUser }: AccountAuthProps) => {
  const [mode, setMode] = useState<Mode>('login');
  return (
    <>
      {mode === 'login' ? (
        <Login
          onUser={onUser}
          onClose={onClose}
          onAskRegistration={() => setMode('register')}
          onAskPasswordReset={() => setMode('reset')}
        />
      ) : null}
      {mode === 'register' ? <Register /> : null}
      {mode === 'reset' ? <LostPassword /> : null}
    </>
  );
};
export default AccountAuth;
