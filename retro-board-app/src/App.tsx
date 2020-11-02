import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import GlobalStyles from './GlobalStyles';
import AuthProvider from './auth/AuthProvider';
import LanguageProvider from './translations/LanguageProvider';
import theme from './Theme';
import { Provider as StateContext } from './state';
import Layout from './Layout';
import ErrorBoundary from './ErrorBoundary';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import config from './utils/getConfig';

setConfig({
  reloadHooks: false,
});

const stripePromise = loadStripe(config.StripeKey);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <LanguageProvider>
              <StateContext>
                <GlobalStyles />
                <ErrorBoundary>
                  <Layout />
                </ErrorBoundary>
              </StateContext>
            </LanguageProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Elements>
  );
}

export default hot(App);
