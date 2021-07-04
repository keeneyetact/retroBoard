import passport from 'passport';
import { Strategy as LocalStrategy, IVerifyOptions } from 'passport-local';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as SlackStrategy } from 'passport-slack';
import { Strategy as MicrosoftStrategy } from 'passport-microsoft';
import { Strategy as OktaStrategy } from 'passport-okta-oauth20';

import {
  TWITTER_CONFIG,
  GOOGLE_CONFIG,
  GITHUB_CONFIG,
  MICROSOFT_CONFIG,
  SLACK_CONFIG,
  OKTA_CONFIG,
} from './config';
import { v4 } from 'uuid';
import { AccountType } from '@retrospected/common';
import chalk from 'chalk';
import loginAnonymous from './logins/anonymous-user';
import loginUser from './logins/password-user';
import UserEntity from '../db/entities/User';
import {
  BaseProfile,
  TwitterProfile,
  GoogleProfile,
  GitHubProfile,
  MicrosoftProfile,
  SlackProfile,
  OktaProfile,
} from './types';
import { getOrSaveUser } from '../db/actions/users';

export default () => {
  passport.serializeUser((user: string, cb) => {
    cb(null, user);
  });
  passport.deserializeUser(async (userId: string, cb) => {
    cb(null, userId);
  });

  function callback<TProfile, TCallback>(type: AccountType) {
    return async (
      _accessToken: string,
      _refreshToken: string,
      anyProfile: TProfile,
      cb: TCallback
    ) => {
      const profile = anyProfile as unknown as BaseProfile;
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
        case 'slack':
          user = buildFromSlackProfile(profile as SlackProfile);
          break;
        case 'microsoft':
          user = buildFromMicrosoftProfile(profile as MicrosoftProfile);
          break;
        case 'okta':
          user = buildFromOktaProfile(profile as OktaProfile);
          break;
        default:
          throw new Error('Unknown provider: ' + type);
      }

      const dbUser = await getOrSaveUser(user);
      const callback = cb as unknown as (
        error: string | null,
        user: string
      ) => void;
      callback(null, dbUser.id);
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
    const email =
      profile.emails && profile.emails.length ? profile.emails[0] : null;
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

  function buildFromSlackProfile(profile: SlackProfile): UserEntity {
    const user: UserEntity = new UserEntity(v4(), profile.displayName);
    const email = profile.user.email;
    user.accountType = 'slack';
    user.language = 'en';
    user.photo = profile.user.image_192;
    user.username = email;
    user.email = email;
    return user;
  }

  function buildFromMicrosoftProfile(profile: MicrosoftProfile): UserEntity {
    const user: UserEntity = new UserEntity(v4(), profile.displayName);
    const email = profile.emails[0].value;
    user.accountType = 'microsoft';
    user.language = 'en';
    user.username = email;
    user.email = email;
    return user;
  }

  function buildFromOktaProfile(profile: OktaProfile): UserEntity {
    const user: UserEntity = new UserEntity(v4(), profile.fullName);
    const email = profile.email;
    user.accountType = 'okta';
    user.language = 'en';
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

  if (SLACK_CONFIG) {
    passport.use(new SlackStrategy(SLACK_CONFIG, callback('slack')));
    console.log(chalk`{blue 🔑  {red Slack} authentication activated}`);
  }

  if (MICROSOFT_CONFIG) {
    passport.use(
      new MicrosoftStrategy(MICROSOFT_CONFIG, callback('microsoft'))
    );
    console.log(chalk`{blue 🔑  {red Microsoft} authentication activated}`);
  }

  if (OKTA_CONFIG) {
    passport.use(new OktaStrategy(OKTA_CONFIG, callback('okta')));
    console.log(chalk`{blue 🔑  {red Okta} authentication activated}`);
  }

  passport.use(
    new LocalStrategy(
      { passwordField: 'password', usernameField: 'username' },
      async (
        username: string,
        password: string,
        done: (
          error: string | null,
          user?: string,
          options?: IVerifyOptions
        ) => void
      ) => {
        if (password && password !== '<<<<<NONE>>>>>') {
          const user = await loginUser(username, password);
          done(!user ? 'User cannot log in' : null, user?.id);
        } else {
          const user = await loginAnonymous(username);
          done(null, user.id);
        }
      }
    )
  );
};
