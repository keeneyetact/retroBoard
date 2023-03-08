import ReactGA from 'react-ga4';
import { Plan, TrackingEvent } from 'common';
import * as Sentry from '@sentry/browser';
import config from './utils/getConfig';
import { isProduction } from 'is-production';
import { noop } from 'lodash';
import { InitOptions } from 'react-ga4/types/ga4';

let sentryErrorCount = 0;

const hasGA = !!config.GOOGLE_ANALYTICS_ID;
const hasSentry = !!config.SENTRY_URL;

export const initialiseAnalytics = () => {
  if (isGAEnabled()) {
    ReactGA.initialize(
      [
        {
          trackingId: config.GOOGLE_ANALYTICS_ID,
        },
        config.GOOGLE_AD_WORDS_ID
          ? {
              trackingId: config.GOOGLE_AD_WORDS_ID,
              gaOptions: {
                name: 'aw',
              },
            }
          : null,
      ].filter(Boolean) as InitOptions[]
    );
  }
};

export const initialiseSentry = () => {
  if (hasSentry) {
    Sentry.init({
      dsn: config.SENTRY_URL,
      release: `frontend@${config.VERSION}`,
    });
  }
};

export const setScope = (fn: (scope: Sentry.Scope | null) => void) => {
  if (hasSentry) {
    Sentry.configureScope(fn);
  } else {
    fn(null);
  }
};

export const recordManualError = (message: string) => {
  if (hasSentry) {
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

export const trackAdWordsConversion = () => {
  if (isGAEnabled() && config.GOOGLE_AD_WORDS_CONVERSION_ID) {
    ReactGA._gtag('event', 'conversion', {
      send_to: config.GOOGLE_AD_WORDS_CONVERSION_ID,
      event_callback: noop,
    });
  }
};

const isGAEnabled = () => {
  return isProduction() && hasGA;
};
