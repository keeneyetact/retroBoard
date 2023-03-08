interface Config {
  GOOGLE_ANALYTICS_ID: string;
  GOOGLE_AD_WORDS_ID: string;
  GOOGLE_AD_WORDS_CONVERSION_ID: string;
  SENTRY_URL: string;
  GIPHY_API_KEY: string;
  STRIPE_KEY: string;
  DEFAULT_LANGUAGE: string;
  VERSION: string;
  MARKETING_ROOT: string;
}

const ALL_KEYS: (keyof Config)[] = [
  'GOOGLE_ANALYTICS_ID',
  'GOOGLE_AD_WORDS_ID',
  'GOOGLE_AD_WORDS_CONVERSION_ID',
  'SENTRY_URL',
  'GIPHY_API_KEY',
  'STRIPE_KEY',
  'DEFAULT_LANGUAGE',
  'VERSION',
  'MARKETING_ROOT',
];

declare global {
  interface Window {
    __env__: Partial<Config>;
  }
}

window.__env__ = window.__env__ || {};

function getKey(key: keyof Config): string {
  if (import.meta.env[`VITE_${key}`]) {
    return import.meta.env[`VITE_${key}`] || '';
  }
  const winObj = window.__env__[key];
  if (winObj) {
    return winObj;
  }
  return '';
}

function getConfig(): Config {
  const config: Config = {} as Config;
  ALL_KEYS.forEach((key) => {
    config[key] = getKey(key);
  });

  // Special cases
  if (!config.DEFAULT_LANGUAGE || config.DEFAULT_LANGUAGE.length !== 5) {
    console.warn(
      'Your default language (DEFAULT_LANGUAGE) is not in the right format. The right format should be a string of 5 characters, for example: en-GB, fr-FR, etc.'
    );
    config.DEFAULT_LANGUAGE = 'en-GB';
  }

  return config;
}

export default getConfig();
