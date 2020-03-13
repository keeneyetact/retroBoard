interface HtmlConfig {
  GOOGLE_ANALYTICS_ID: string;
  SENTRY_URL: string;
  GIPHY_API_KEY: string;
}

interface Config {
  hasGA: boolean;
  hasSentry: boolean;
  hasGiphy: boolean;
  GoogleAnalyticsId: string;
  SentryUrl: string;
  GiphyApiKey: string;
}

declare global {
  interface Window {
    __env__: HtmlConfig;
  }
}

window.__env__ = window.__env__ || {};

function getKey(
  key: 'GOOGLE_ANALYTICS_ID' | 'SENTRY_URL' | 'GIPHY_API_KEY',
  noValue: string
): string {
  if (process.env[`REACT_APP_${key}`]) {
    return process.env[`REACT_APP_${key}`] || '';
  }
  if (!!window.__env__[key] && window.__env__[key] !== noValue) {
    return window.__env__[key];
  }
  return '';
}

function getConfig(): Config {
  const googleAnalyticsId = getKey('GOOGLE_ANALYTICS_ID', 'NO_GA');
  const sentryUrl = getKey('SENTRY_URL', 'NO_SENTRY');
  const giphyApiKey = getKey('GIPHY_API_KEY', 'NO_GIPHY');

  return {
    hasGA: !!googleAnalyticsId,
    hasSentry: !!sentryUrl,
    hasGiphy: !!giphyApiKey,
    GoogleAnalyticsId: googleAnalyticsId,
    SentryUrl: sentryUrl,
    GiphyApiKey: giphyApiKey,
  };
}

export default getConfig();
