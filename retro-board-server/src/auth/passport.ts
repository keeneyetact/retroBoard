import passport from 'passport';
import { Strategy as LocalStrategy, IVerifyOptions } from 'passport-local';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as GithubStrategy } from 'passport-github';
import { TWITTER_CONFIG, GOOGLE_CONFIG, GITHUB_CONFIG } from './config';
import { Store } from '../types';
import { v4 } from 'uuid';
import { User, AccountType } from 'retro-board-common';
import chalk from 'chalk';
import loginAnonymous from './logins/anonymous-user';
import loginUser from './logins/password-user';
import UserEntity from '../db/entities/User';
import {
  BaseProfile,
  TwitterProfile,
  GoogleProfile,
  GitHubProfile,
} from './types';

export default (store: Store) => {
  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser((user: string, cb) => {
    cb(null, user);
  });
  passport.deserializeUser(async (userId: string, cb) => {
    cb(null, userId);
  });

  // The callback that is invoked when an OAuth provider sends back user
  // information. Normally, you would save the user to the database
  // in this callback and it would be customized for each provider
  function callback(type: AccountType) {
    return async (
      _accessToken: string,
      _refreshToken: string,
      anyProfile: any,
      cb: Function
    ) => {
      const profile = anyProfile as BaseProfile;
      let user: UserEntity;
      switch (type) {
        case 'google':
          user = buildFromGoogleProfile(profile as GoogleProfile);
          break;
        case 'github':
          user = buildFromGitHubProfile(profile as GitHubProfile);
          break;
        case 'twitter':
          user = buildFromTwitterProfile(profile as TwitterProfile);
          break;
        default:
          throw new Error('Unknown provider: ' + type);
      }

      const dbUser = await store.getOrSaveUser(user);
      cb(null, dbUser.id);
    };
  }

  function buildFromTwitterProfile(profile: TwitterProfile): UserEntity {
    const user: UserEntity = new UserEntity(v4(), profile.displayName);
    user.accountType = 'twitter';
    user.language = 'en';
    user.photo = profile.photos?.length ? profile.photos[0].value : null;
    user.username = profile.username;
    user.email = profile.emails.length ? profile.emails[0].value : null;
    return user;
  }

  function buildFromGitHubProfile(profile: GitHubProfile): UserEntity {
    const displayName =
      profile.displayName ||
      profile.username ||
      (profile.emails.length ? profile.emails[0].value : '');

    const user: UserEntity = new UserEntity(v4(), displayName);
    const email = profile.emails
      ? profile.emails.find((e) => e.primary) || null
      : null;
    user.accountType = 'github';
    user.language = 'en';
    user.photo = profile.photos?.length ? profile.photos[0].value : null;
    user.username = profile.username;
    user.email = email ? email.value : null;
    return user;
  }

  function buildFromGoogleProfile(profile: GoogleProfile): UserEntity {
    const user: UserEntity = new UserEntity(v4(), profile.displayName);
    const email = profile.emails.length ? profile.emails[0].value : null;
    user.accountType = 'google';
    user.language = 'en';
    user.photo = profile.photos?.length ? profile.photos[0].value : null;
    user.username = email;
    user.email = email;
    return user;
  }

  // Adding each OAuth provider's strategy to passport
  if (TWITTER_CONFIG) {
    passport.use(new TwitterStrategy(TWITTER_CONFIG, callback('twitter')));
    console.log(chalk`{blue 🔑  {red Twitter} authentication activated}`);
  }

  if (GOOGLE_CONFIG) {
    passport.use(new GoogleStrategy(GOOGLE_CONFIG, callback('google')));
    console.log(chalk`{blue 🔑  {red Google} authentication activated}`);
  }

  if (GITHUB_CONFIG) {
    passport.use(new GithubStrategy(GITHUB_CONFIG, callback('github')));
    console.log(chalk`{blue 🔑  {red GitHub} authentication activated}`);
  }

  passport.use(
    new LocalStrategy(
      { passwordField: 'password', usernameField: 'username' },
      async (
        username: string,
        password: string,
        done: (error: any, user?: any, options?: IVerifyOptions) => void
      ) => {
        if (password && password !== '<<<<<NONE>>>>>') {
          const user = await loginUser(store, username, password);
          done(!user ? 'User cannot log in' : null, user?.id);
        } else {
          const user = await loginAnonymous(store, username);
          done(null, user.id);
        }
      }
    )
  );
};
