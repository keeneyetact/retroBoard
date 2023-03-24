import { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FullUser } from 'common';
import Wrapper from './../Wrapper';
import Input from '../../../components/Input';
import { Email, VpnKey } from '@mui/icons-material';
import { accountLogin } from '../../../api';
import styled from '@emotion/styled';

interface LoginProps {
  onClose: () => void;
  onUser: (user: FullUser | null) => void;
  onAskRegistration: () => void;
  onAskPasswordReset: () => void;
}

const Login = ({
  onClose,
  onUser,
  onAskRegistration,
  onAskPasswordReset,
}: LoginProps) => {
  const { t } = useTranslation();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleAccountogin = useCallback(() => {
    async function login() {
      if (loginEmail.length && loginPassword.length) {
        setLoading(true);
        const user = await accountLogin(loginEmail, loginPassword);
        setLoading(false);
        onUser(user);
        if (user) {
          if (onClose) {
            onClose();
          }
        } else {
          setError(t('AccountLogin.errorEmailPasswordIncorrect')!);
        }
      }
    }
    login();
  }, [loginEmail, loginPassword, t, onClose, onUser]);

  return (
    <Wrapper
      header={t('AccountLogin.header')!}
      help={t('AccountLogin.info')}
      actions={
        <Button
          onClick={handleAccountogin}
          color="primary"
          autoFocus
          startIcon={loading ? <CircularProgress size="1em" /> : null}
          disabled={!loginEmail || !loginPassword || loading}
          data-cy="account-login-button"
        >
          {t('AccountLogin.loginButton')}
        </Button>
      }
    >
      {error ? (
        <Alert severity="error" style={{ marginTop: 10 }}>
          {error}
        </Alert>
      ) : null}
      <Links>
        <Button data-cy="register" color="primary" onClick={onAskRegistration}>
          {t('AccountLogin.registerLink')}
        </Button>
        <Button
          data-cy="forgot-password"
          color="secondary"
          onClick={onAskPasswordReset}
        >
          {t('AccountLogin.forgotPasswordLink')}
        </Button>
      </Links>
      <Input
        value={loginEmail}
        onChangeValue={setLoginEmail}
        title={t('AuthCommon.emailField')!}
        placeholder={t('AuthCommon.emailField')!}
        type="email"
        variant="standard"
        fullWidth
        style={{ marginTop: 20 }}
        leftIcon={<Email />}
        inputProps={{ 'data-cy': 'account-login-input' }}
      />
      <Input
        value={loginPassword}
        onChangeValue={setLoginPassword}
        title={t('AuthCommon.passwordField')!}
        placeholder={t('AuthCommon.passwordField')!}
        type="password"
        variant="standard"
        fullWidth
        style={{ marginTop: 20 }}
        leftIcon={<VpnKey />}
        inputProps={{ 'data-cy': 'account-password-input' }}
      />
    </Wrapper>
  );
};

const Links = styled.div`
  margin: 20px 0;
  display: flex;
  gap: 20px;

  @media (max-width: 400px) {
    flex-direction: column;
    gap: 5px;
  }
`;

export default Login;
