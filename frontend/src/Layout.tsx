import { useEffect, useCallback, lazy, Suspense } from 'react';
import { useHistory, Redirect, Switch, Route } from 'react-router-dom';
import { trackPageView } from './track';
import styled from '@emotion/styled';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AccountMenu from './auth/AccountMenu';
import useIsCompatibleBrowser from './hooks/useIsCompatibleBrowser';
import OutdatedBrowser from './components/OutdatedBrowser';
import useIsInitialised from './auth/useIsInitialised';
import useUser from './auth/useUser';
import { HomeOutlined } from '@mui/icons-material';
import ProPill from './components/ProPill';
import { CodeSplitLoader } from './CodeSplitLoader';
import useSidePanel from './views/panel/useSidePanel';
import { Alert, AlertTitle, Button, Hidden } from '@mui/material';
import useBackendCapabilities from './global/useBackendCapabilities';
import useIsPro from 'auth/useIsPro';
import ProButton from 'components/ProButton';

const Home = lazy(() => import('./views/Home' /* webpackChunkName: "home" */));
const Game = lazy(() => import('./views/Game' /* webpackChunkName: "game" */));
const LoginPage = lazy(
  () => import('./views/login/LoginPage' /* webpackChunkName: "login" */)
);
const AccountPage = lazy(
  () => import('./views/account/AccountPage' /* webpackChunkName: "account" */)
);
const CancelPage = lazy(
  () => import('./views/subscribe/CancelPage' /* webpackChunkName: "cancel" */)
);
const SuccessPage = lazy(
  () =>
    import('./views/subscribe/SuccessPage' /* webpackChunkName: "success" */)
);
const SubscribePageOuter = lazy(
  () =>
    import(
      './views/subscribe/SubscribePageOuter' /* webpackChunkName: "subscribe" */
    )
);
const ResetPasswordPage = lazy(
  () => import('./views/Reset' /* webpackChunkName: "reset" */)
);
const ValidatePage = lazy(
  () => import('./views/Validate' /* webpackChunkName: "validate" */)
);
const DisclaimerPage = lazy(
  () =>
    import('./views/policies/Disclaimer' /* webpackChunkName: "disclaimer" */)
);
const AcceptableUsePolicyPage = lazy(
  () =>
    import(
      './views/policies/AcceptableUse' /* webpackChunkName: "acceptable-use" */
    )
);
const CookiesPolicyPage = lazy(
  () => import('./views/policies/Cookies' /* webpackChunkName: "cookies" */)
);
const TermsAndConditionsPage = lazy(
  () => import('./views/policies/Terms' /* webpackChunkName: "terms" */)
);
const Invite = lazy(
  () => import('./views/layout/Invite' /* webpackChunkName: "invite" */)
);
const PrivacyPolicyPage = lazy(
  () => import('./views/policies/Privacy' /* webpackChunkName: "privacy" */)
);
const Panel = lazy(
  () => import('./views/Panel' /* webpackChunkName: "panel" */)
);
const EncryptionDoc = lazy(
  () =>
    import('./views/home/Encryption' /* webpackChunkName: "encryption-doc" */)
);
const AdminPage = lazy(
  () => import('./views/admin/AdminPage' /* webpackChunkName: "admin-page" */)
);

const Title = styled(Typography)`
  color: white;
`;

function App() {
  const history = useHistory();
  const backend = useBackendCapabilities();
  const isCompatible = useIsCompatibleBrowser();
  const { toggle: togglePanel } = useSidePanel();
  const isInitialised = useIsInitialised();
  const user = useUser();
  const isPro = useIsPro();
  const displayGoPro = !isPro && user && user.accountType !== 'anonymous';
  const goToHome = useCallback(() => history.push('/'), [history]);
  useEffect(() => {
    trackPageView(window.location.pathname);
    const unregister = history.listen((location) => {
      trackPageView(location.pathname);
    });
    return () => {
      unregister();
    };
  }, [history]);
  return (
    <div>
      {!backend.licenced ? (
        <Alert title="Unlicenced" severity="error">
          <AlertTitle>Retrospected is Unlicenced</AlertTitle>
          This software is unlicenced. You can obtain a licence{' '}
          <a
            target="_blank"
            href="https://www.retrospected.com/subscribe?product=self-hosted"
            rel="noreferrer"
          >
            here
          </a>
          . A licence will give you, for a one-time fee, unlimited updates,
          access to all pro features for all users, and a dedicated
          administration panel.
        </Alert>
      ) : null}
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
          <MainTitle variant="h6" color="inherit" onClick={goToHome}>
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
          <Route path="/game/:gameId" component={Invite} />
          {isInitialised ? (
            <AccountMenu />
          ) : (
            <Initialising>Loading...</Initialising>
          )}
        </Toolbar>
      </AppBar>
      <Suspense fallback={<CodeSplitLoader />}>
        <Switch>
          <Route path="/" exact>
            {user ? <Home /> : null}
          </Route>
          <Redirect from="/session/:gameId" to="/game/:gameId" />
          <Route path="/game/:gameId" component={Game} />
          <Route path="/validate" component={ValidatePage} />
          <Route path="/reset" component={ResetPasswordPage} />
          <Route path="/account" component={AccountPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/subscribe" component={SubscribePageOuter} exact />
          <Route path="/subscribe/success" component={SuccessPage} exact />
          <Route path="/subscribe/cancel" component={CancelPage} exact />
          <Route path="/admin" component={AdminPage} />
          <Route path="/privacy" component={PrivacyPolicyPage} />
          <Route path="/terms" component={TermsAndConditionsPage} />
          <Route path="/cookies" component={CookiesPolicyPage} />
          <Route path="/acceptable-use" component={AcceptableUsePolicyPage} />
          <Route path="/disclaimer" component={DisclaimerPage} />
          <Route path="/how-does-encryption-work" component={EncryptionDoc} />
        </Switch>
      </Suspense>
      <Panel />
      <OutdatedBrowser show={!isCompatible} />
    </div>
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

export default App;
