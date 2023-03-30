import { useCallback } from 'react';
import DialogContent from '@mui/material/DialogContent';
import { useTranslation } from 'react-i18next';
import SocialAuth from './SocialAuth';
import AccountAuth from './AccountAuth';
import useOAuthAvailabilities from '../../global/useOAuthAvailabilities';
import useBackendCapabilities from '../../global/useBackendCapabilities';
import { Alert, Button } from '@mui/material';
import styled from '@emotion/styled';
import { anonymousLogin, me, updateLanguage } from 'api';
import { trackEvent } from 'track';
import { useLanguage } from 'translations';
import { NoAccounts } from '@mui/icons-material';
import { useSetUser } from 'state/user/useSetUser';

interface LoginContentProps {
  anonymous: boolean;
  onClose: () => void;
}

export default function LoginContent({
  anonymous,
  onClose,
}: LoginContentProps) {
  const { any } = useOAuthAvailabilities();
  const { disableAnonymous, disablePasswords } = useBackendCapabilities();
  const hasNoSocialMediaAuth = !any;
  const hasNoWayOfLoggingIn =
    hasNoSocialMediaAuth && disableAnonymous && disablePasswords;
  const hasNoWayOtherThanAnonymous = hasNoSocialMediaAuth && disablePasswords;
  const { t } = useTranslation();
  const setUser = useSetUser();
  const [language] = useLanguage();

  const handleAnonLogin = useCallback(async () => {
    const user = await anonymousLogin('Anonymous User');
    if (!user) {
      return;
    }
    trackEvent('register/anonymous');
    let updatedUser = await me();
    if (updatedUser?.language === null) {
      updatedUser = await updateLanguage(language.locale);
    }
    setUser(updatedUser);
    if (onClose) {
      onClose();
    }
  }, [setUser, onClose, language]);

  if (hasNoWayOfLoggingIn) {
    <Alert severity="error">{t('AuthCommon.noAuthWarning')}</Alert>;
  }

  return (
    <>
      {hasNoWayOtherThanAnonymous ? (
        <Alert severity="error">{t('AuthCommon.noAuthWarning')}</Alert>
      ) : (
        <>
          <DialogContent>
            <Main>
              <Container>
                {!hasNoSocialMediaAuth ? (
                  <SocialAuth onClose={onClose} onUser={setUser} />
                ) : null}
                {!hasNoSocialMediaAuth && !disablePasswords ? (
                  <Separator>
                    <span>{t('AuthCommon.or')}</span>
                  </Separator>
                ) : null}
                {!disablePasswords ? (
                  <AccountAuth onClose={onClose} onUser={setUser} />
                ) : null}
              </Container>
            </Main>
            {anonymous ? (
              <Footer>
                <Button
                  onClick={handleAnonLogin}
                  variant="text"
                  color="secondary"
                  startIcon={<NoAccounts />}
                  data-cy="login-anonymous"
                >
                  {t('AuthCommon.skipAndAnonLogin')}
                </Button>
              </Footer>
            ) : null}
          </DialogContent>
        </>
      )}
    </>
  );
}

const Separator = styled.div`
  display: flex;
  height: 200px;
  max-height: unset;
  width: 0px;
  max-width: 0px;
  margin: 0 20px;
  border-left: 1px solid #ccc;
  background-color: #ccc;
  flex: 0;
  align-self: center;
  justify-content: center;
  align-items: center;

  span {
    display: block;
    padding: 5px;
    background-color: white;
    color: #ccc;
  }

  @media screen and (max-width: 1000px) {
    width: 80%;
    height: 0px;
    max-height: 0px;
    max-width: unset;
    margin: 10px 0;
    border-top: 1px solid #ccc;
  }
`;

const Container = styled.div`
  display: flex;
  gap: 20px;
  > * {
    flex: 1;
  }

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Main = styled.div``;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;

  @media screen and (max-width: 1000px) {
    border-top: 1px solid #ccc;
    justify-content: center;
    margin-top: 30px;
    padding-top: 30px;
  }
`;
