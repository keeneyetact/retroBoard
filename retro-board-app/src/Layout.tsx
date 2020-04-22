import React, { useEffect, useCallback } from 'react';
import { useHistory, Redirect, Switch, Route } from 'react-router-dom';
import { trackPageView } from './track';
import styled from 'styled-components';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Home from './views/Home';
import Game from './views/Game';
import Panel from './views/Panel';

import Invite from './views/layout/Invite';
import Sandbox from './views/Sandbox';
import LoginButton from './auth/LoginButton';
import useGlobalState from './state';
import useIsCompatibleBrowser from './hooks/useIsCompatibleBrowser';
import OutdatedBrowser from './components/OutdatedBrowser';

const Title = styled(Typography)`
  flex-grow: 1;
  color: white;
`;

function App() {
  const history = useHistory();
  const isCompatible = useIsCompatibleBrowser();
  const { togglePanel } = useGlobalState();
  const goToHome = useCallback(() => history.push('/'), [history]);
  useEffect(() => {
    const unregister = history.listen(location => {
      trackPageView(location.pathname);
    });
    return () => {
      unregister();
    };
  }, [history]);
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" onClick={togglePanel}>
            <MenuIcon />
          </IconButton>
          <MainTitle variant="h6" color="inherit" onClick={goToHome}>
            Retrospected
          </MainTitle>
          <Route path="/game/:gameId" component={Invite} />
          <LoginButton />
        </Toolbar>
      </AppBar>
      <Route path="/" exact component={Home} />
      <Route path="/sandbox" exact component={Sandbox} />
      <Switch>
        <Redirect from="/session/:gameId" to="/game/:gameId" />
        <Route path="/game/:gameId" component={Game} />
      </Switch>
      <Panel />
      <OutdatedBrowser show={!isCompatible} />
    </div>
  );
}

const MainTitle = styled(Title)`
  cursor: pointer;
`;

export default App;
