import ReactGA from 'react-ga';
import { TrackingEvent } from 'retro-board-common';

export const initialiseAnalytics = () => {
  if (isGAEnabled()) {
    ReactGA.initialize(process.env.REACT_APP_GA_ID!);
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

export const trackPageView = (path: string) => {
  if (isGAEnabled()) {
    ReactGA.pageview(path);
  }
};

const isGAEnabled = () => {
  const enabled =
    process.env.NODE_ENV === 'production' && !!process.env.REACT_APP_GA_ID;
  return enabled;
};
