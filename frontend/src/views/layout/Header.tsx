import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Hidden } from '@mui/material';
import useIsPro from 'auth/useIsPro';
import ProButton from 'components/ProButton';
import styled from '@emotion/styled';
import { useCallback } from 'react';
import useUser from 'auth/useUser';
import { useMatch, useNavigate } from 'react-router-dom';
import useSidePanel from 'views/panel/useSidePanel';
import useIsInitialised from 'auth/useIsInitialised';
import Invite from './Invite';
import AccountMenu from 'auth/AccountMenu';
import { useTranslation } from 'react-i18next';
import ProPill from 'components/ProPill';
import { AiButton } from './ai/AiButton';
import logoIcon from './logo-white.png';
import logoText from './text-white.png';

export function Header() {
  const user = useUser();
  const isPro = useIsPro();
  const navigate = useNavigate();
  const displayGoPro = !isPro && user && user.accountType !== 'anonymous';
  const goToHome = useCallback(() => navigate('/'), [navigate]);
  const { toggle: togglePanel } = useSidePanel();
  const isInitialised = useIsInitialised();
  const isOnGamePage = !!useMatch('game/:gameId/*');
  const { t } = useTranslation();
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Menu"
          onClick={togglePanel}
          size="large"
          data-cy="side-panel-toggle"
        >
          <MenuIcon />
        </IconButton>
        <MainTitle onClick={goToHome} data-cy="header-home-button">
          <img src={logoIcon} alt="Retrospected Icon" height="30" />
          <img src={logoText} alt="Retrospected" height="30" />
        </MainTitle>
        <ProPillContainer>
          <ProPill small />
        </ProPillContainer>
        {displayGoPro ? (
          <Hidden mdDown>
            <GoProContainer>
              <ProButton>
                <Button variant="contained" color="secondary">
                  ⭐️ Go Pro!
                </Button>
              </ProButton>
            </GoProContainer>
          </Hidden>
        ) : null}
        <Spacer />
        {user ? <AiButton /> : null}
        <Spacer />
        {isOnGamePage ? <Invite /> : null}
        {isInitialised ? (
          <AccountMenu />
        ) : (
          <Initialising>{t('Main.loading')}</Initialising>
        )}
      </Toolbar>
    </AppBar>
  );
}

const MainTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 20px;
  > :nth-of-type(2) {
    position: relative;
    top: 2px;
  }

  @media screen and (max-width: 800px) {
    > :nth-of-type(2) {
      display: none;
    }
  }

  @media screen and (max-width: 400px) {
    display: none;
  }
`;

const ProPillContainer = styled.div``;

const GoProContainer = styled.div`
  margin-left: 20px;
`;

const Initialising = styled.div``;

const Spacer = styled.div`
  flex: 1;
`;
