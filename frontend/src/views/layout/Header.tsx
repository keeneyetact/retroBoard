import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { HomeOutlined } from '@mui/icons-material';
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

const Title = styled(Typography)`
  color: white;
`;

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
        <HomeButton>
          <IconButton
            color="inherit"
            aria-label="Home"
            onClick={goToHome}
            size="large"
          >
            <HomeOutlined />
          </IconButton>
        </HomeButton>
        <MainTitle
          variant="h6"
          color="inherit"
          onClick={goToHome}
          data-cy="header-home-button"
        >
          Retrospected&nbsp;
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

const MainTitle = styled(Title)`
  cursor: pointer;
  margin-right: 10px;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const HomeButton = styled.div`
  margin-right: 10px;
`;

const ProPillContainer = styled.div``;

const GoProContainer = styled.div`
  margin-left: 20px;
`;

const Initialising = styled.div``;

const Spacer = styled.div`
  flex: 1;
`;
