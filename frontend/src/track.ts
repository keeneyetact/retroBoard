import ReactGA from 'react-ga4';
import { Plan, TrackingEvent } from 'common';
import * as Sentry from '@sentry/browser';
import config from './utils/getConfig';

let sentryErrorCount = 0;

export const initialiseAnalytics = () => {
  if (isGAEnabled()) {
    ReactGA.initialize(config.GoogleAnalyticsId);
  }
};

export const initialiseSentry = () => {
  if (config.hasSentry) {
    Sentry.init({
      dsn: config.SentryUrl,
      release: `frontend@${config.version}`,
    });
  }
};

export const setScope = (fn: (scope: Sentry.Scope | null) => void) => {
  if (config.hasSentry) {
    Sentry.configureScope(fn);
  } else {
    fn(null);
  }
};

export const recordManualError = (message: string) => {
  if (config.hasSentry) {
    sentryErrorCount += 1;
    if (sentryErrorCount > 100) {
      console.error(
        'Captured too many Sentry errors. Ignoring this one.',
        sentryErrorCount
      );
    } else {
      Sentry.withScope((scope) => {
        scope.setLevel('error');
        Sentry.captureMessage(message, 'error');
      });
    }
  }
};

export const trackAction = (event: string) => {
  if (isGAEnabled()) {
    ReactGA.event({
      category: 'Action',
      action: event.replace('retrospected/', ''),
    });
  }
};

export const trackEvent = (event: TrackingEvent) => {
  if (isGAEnabled()) {
    ReactGA.event({
      category: 'Event',
      action: event,
    });
  }
};

export const trackPurchase = (plan: Plan, valueUsd: number) => {
  if (isGAEnabled()) {
    ReactGA.event({
      category: 'Event',
      action: 'purchase',
      value: valueUsd,
      label: plan,
    });
  }
};

export const trackPageView = (path: string) => {
  if (isGAEnabled()) {
    ReactGA.send({ hitType: 'pageview', page: path });
  }
};

const isGAEnabled = () => {
  return process.env.NODE_ENV === 'production' && config.hasGA;
};
