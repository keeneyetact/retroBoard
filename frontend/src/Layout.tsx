import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { trackPageView } from './track';
import useIsCompatibleBrowser from './hooks/useIsCompatibleBrowser';
import OutdatedBrowser from './components/OutdatedBrowser';
import { CodeSplitLoader } from './CodeSplitLoader';
import { Alert, AlertTitle } from '@mui/material';
import useBackendCapabilities from './global/useBackendCapabilities';
import { useTranslation } from 'react-i18next';
import { Welcome } from 'views/Welcome';
import { Header } from 'views/layout/Header';
import useUser from 'state/user/useUser';

const Home = lazy(() => import('./views/Home'));
const Game = lazy(() => import('./views/Game'));
const LoginPage = lazy(() => import('./views/login/LoginPage'));
const AccountPage = lazy(() => import('./views/account/AccountPage'));
const CancelPage = lazy(() => import('./views/subscribe/CancelPage'));
const SuccessPage = lazy(() => import('./views/subscribe/SuccessPage'));
const SubscribePageOuter = lazy(
  () => import('./views/subscribe/SubscribePageOuter')
);
const ResetPasswordPage = lazy(() => import('./views/Reset'));
const ValidatePage = lazy(() => import('./views/Validate'));
const Panel = lazy(() => import('./views/Panel'));
const EncryptionDoc = lazy(() => import('./views/home/Encryption'));
const AdminPage = lazy(() => import('./views/admin/AdminPage'));
const Demo = lazy(() => import('./views/Demo'));

function App() {
  const backend = useBackendCapabilities();
  const isCompatible = useIsCompatibleBrowser();
  const user = useUser();

  const location = useLocation();

  const { t } = useTranslation();

  // Tracks page views on every location change
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <div>
      {!backend.licenced ? (
        <Alert title="Unlicenced" severity="error">
          <AlertTitle>{t('Main.unlicenced.title')}</AlertTitle>
          This software is unlicenced. You can obtain a licence{' '}
          <a
            target="_blank"
            href="https://app.retrospected.com/subscribe?product=self-hosted"
            rel="noreferrer"
          >
            here
          </a>
          . A licence will give you, for a one-time fee, unlimited updates,
          access to all pro features for all users, and a dedicated
          administration panel.
        </Alert>
      ) : null}
      <Header />
      <Suspense fallback={<CodeSplitLoader />}>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Welcome />} />
          <Route path="game/:gameId/*" element={<Game />} />
          <Route path="validate" element={<ValidatePage />} />
          <Route path="reset" element={<ResetPasswordPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="demo" element={<Demo />} />
          <Route path="subscribe" element={<SubscribePageOuter />}>
            <Route path="success" element={<SuccessPage />} />
            <Route path="cancel" element={<CancelPage />} />
          </Route>
          <Route path="admin" element={<AdminPage />} />
          <Route path="how-does-encryption-work" element={<EncryptionDoc />} />
        </Routes>
      </Suspense>
      <Panel />
      <OutdatedBrowser show={!isCompatible} />
    </div>
  );
}

export default App;
