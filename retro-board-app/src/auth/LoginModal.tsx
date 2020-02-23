import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import { User } from 'retro-board-common';
import io from 'socket.io-client';
import {
  Dialog,
  Button,
  DialogContent,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
  GithubLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
} from 'react-social-login-buttons';
import useTranslations from '../translations';
import UserContext from './Context';
import { anonymousLogin } from '../api';
import styled from 'styled-components';

const API_URL = '/api/auth';

interface LoginModalProps {
  onClose?: () => void;
}

const Login = ({ onClose }: LoginModalProps) => {
  const translations = useTranslations();
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const windowRef = useRef<Window | null>(null);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const s = io();
    setSocket(s);
    s.on('auth', (user: User) => {
      setUser(user);
      if (windowRef.current) {
        windowRef.current.close();
        windowRef.current = null;
      }
      if (onClose) {
        onClose();
      }
    });
    return () => {
      if (s && s.connected) {
        s.disconnect();
      }
    };
  }, [onClose, setUser]);

  const [username, setUsername] = useState('');
  const handleAnonLogin = useCallback(() => {
    async function login() {
      const trimmedUsername = username.trim();
      if (trimmedUsername.length) {
        const user = await anonymousLogin(trimmedUsername);
        setUser(user);
        if (onClose) {
          onClose();
        }
      }
    }
    login();
  }, [username, setUser, onClose]);
  const handleUsernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value),
    [setUsername]
  );
  const handleOAuth = useCallback(
    (provider: string) => {
      const width = 600;
      const height = 600;
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2;
      const url = `${API_URL}/${provider}?socketId=${socket!.id}`;

      windowRef.current = window.open(
        url,
        '',
        `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
      );
    },
    [socket]
  );
  const handleGitHub = useCallback(() => handleOAuth('github'), [handleOAuth]);
  const handleGoogle = useCallback(() => handleOAuth('google'), [handleOAuth]);
  const handleTwitter = useCallback(() => handleOAuth('twitter'), [
    handleOAuth,
  ]);
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);
  return (
    <Dialog
      fullScreen={false}
      maxWidth="xs"
      fullWidth
      open
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent>
        <Card>
          <CardHeader title="Account Login" />
          <CardContent>
            <Alert severity="info">
              This will use your account to authenticate you, and will allow you
              to retrieve all your sessions. No password is stored.
            </Alert>
            <AccountsButtons>
              <GithubLoginButton onClick={handleGitHub} />
              <GoogleLoginButton onClick={handleGoogle} />
              <TwitterLoginButton onClick={handleTwitter} />
            </AccountsButtons>
          </CardContent>
        </Card>
        <Typography variant="h4" style={{ textAlign: 'center', margin: 20 }}>
          or
        </Typography>
        <Card>
          <CardHeader title="Anonymous Login" />
          <CardContent>
            <Alert severity="info">
              This will create an anonymous account, but won't allow you to
              retrieve past sessions.
            </Alert>
            <Input
              value={username}
              onChange={handleUsernameChange}
              title={translations.Login.buttonLabel}
              placeholder={translations.Login.namePlaceholder}
              fullWidth
              style={{ marginTop: 20 }}
            />
            <CardActions style={{ justifyContent: 'flex-end' }}>
              <Button
                onClick={handleAnonLogin}
                color="primary"
                autoFocus
                disabled={!username.trim().length}
              >
                {translations.Login.buttonLabel}
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

const AccountsButtons = styled.div`
  margin-top: 30px;
`;

export default Login;
