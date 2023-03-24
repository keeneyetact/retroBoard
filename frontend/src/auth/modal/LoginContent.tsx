import { useContext } from 'react';
import DialogContent from '@mui/material/DialogContent';
import { useTranslation } from 'react-i18next';
import UserContext from '../Context';
import SocialAuth from './SocialAuth';
import AccountAuth from './AccountAuth';
import useOAuthAvailabilities from '../../global/useOAuthAvailabilities';
import useBackendCapabilities from '../../global/useBackendCapabilities';
import { Alert } from '@mui/material';
import styled from '@emotion/styled';

interface LoginContentProps {
  allowAnonymous?: boolean;
  onClose: () => void;
}

export default function LoginContent({
  onClose,
  allowAnonymous = true,
}: LoginContentProps) {
  const { any } = useOAuthAvailabilities();
  const { disableAnonymous, disablePasswords } = useBackendCapabilities();
  const hasNoSocialMediaAuth = !any;
  const hasNoWayOfLoggingIn =
    hasNoSocialMediaAuth && disableAnonymous && disablePasswords;
  const { t } = useTranslation();
  const { setUser } = useContext(UserContext);

  return (
    <>
      {hasNoWayOfLoggingIn ? (
        <Alert severity="error">{t('AuthCommon.noAuthWarning')}</Alert>
      ) : (
        <>
          <DialogContent>
            <Container>
              {!hasNoSocialMediaAuth ? (
                <SocialAuth onClose={onClose} onUser={setUser} />
              ) : null}
              <Separator>
                <span>{t('AuthCommon.or')}</span>
              </Separator>
              {!disablePasswords ? (
                <AccountAuth onClose={onClose} onUser={setUser} />
              ) : null}
            </Container>
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
