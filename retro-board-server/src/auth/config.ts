import { IStrategyOption } from 'passport-twitter';
import { IOAuth2StrategyOption } from 'passport-google-oauth';
import { StrategyOptions } from 'passport-github';
import config from '../db/config';

const providers = ['twitter', 'google', 'github'];

const CLIENT_ORIGIN = config.BASE_URL || 'http://localhost:3000';

const callbacks = providers.map(provider => {
  const url = `${CLIENT_ORIGIN}/api/auth/${provider}/callback`;
  // console.log('Callback URL: ', url);
  return url;
});

const [twitterURL, googleURL, githubURL] = callbacks;

export const TWITTER_CONFIG: IStrategyOption = {
  consumerKey: config.TWITTER_KEY || '',
  consumerSecret: config.TWITTER_SECRET || '',
  callbackURL: twitterURL,
};

export const GOOGLE_CONFIG: IOAuth2StrategyOption = {
  clientID: config.GOOGLE_KEY || '',
  clientSecret: config.GOOGLE_SECRET || '',
  callbackURL: googleURL,
};

export const GITHUB_CONFIG: StrategyOptions = {
  clientID: config.GITHUB_KEY || '',
  clientSecret: config.GITHUB_SECRET || '',
  callbackURL: githubURL,
};
