import passport from 'passport';
import { Strategy as LocalStrategy, IVerifyOptions } from 'passport-local';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
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
import { AccountType } from '../common';
import chalk from 'chalk';
import loginUser from './logins/password-user';
import loginAnonymous from './logins/anonymous-user';
import {
  BaseProfile,
  TwitterProfile,
  GoogleProfile,
  GitHubProfile,
  MicrosoftProfile,
  SlackProfile,
  OktaProfile,
} from './types';
import { registerUser, UserRegistration } from '../db/actions/users';
import { serialiseIds, UserIds, deserialiseIds } from '../utils';
import config from '../config';

export default () => {
  passport.serializeUser<string>((user, cb) => {
    // Typings are wrong
    const actualUser = user as unknown as UserIds;
    cb(null, serialiseIds(actualUser));
  });
  passport.deserializeUser<string>(async (userId: string, cb) => {
    cb(null, deserialiseIds(userId) as unknown as string);
  });

  function callback<TProfile, TCallback>(type: AccountType) {
    return async (
      _accessToken: string,
      _refreshToken: string,
      anyProfile: TProfile,
      cb: TCallback
    ) => {
      const profile = anyProfile as unknown as BaseProfile;
      let user: UserRegistration | null;
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

      const callback = cb as unknown as (
        error: string | null,
        user: UserIds | null
      ) => void;

      if (!user) {
        callback('Cannot build a user profile', null);
        return;
      }

      const dbIdentity = await registerUser(user);

      callback(null, dbIdentity.toIds());
    };
  }

  function buildFromTwitterProfile(
    profile: TwitterProfile
  ): UserRegistration | null {
    const email = profile.emails.length ? profile.emails[0].value : null;
    if (!email) {
      return null;
    }
    return {
      name: profile.displayName,
      type: 'twitter',
      photo: profile.photos?.length ? profile.photos[0].value : undefined,
      username: profile.username,
      email,
    };
  }

  function buildFromGitHubProfile(
    profile: GitHubProfile
  ): UserRegistration | null {
    const displayName =
      profile.displayName ||
      profile.username ||
      (profile.emails.length ? profile.emails[0].value : '');
    const email =
      profile.emails && profile.emails.length ? profile.emails[0] : null;

    if (!email) {
      return null;
    }

    return {
      name: displayName,
      type: 'github',
      photo: profile.photos?.length ? profile.photos[0].value : undefined,
      username: profile.username,
      email: email.value,
    };
  }

  function buildFromGoogleProfile(
    profile: GoogleProfile
  ): UserRegistration | null {
    const email = profile.emails.length ? profile.emails[0].value : null;
    if (!email) {
      return null;
    }
    return {
      name: profile.displayName,
      type: 'google',
      photo: profile.photos?.length ? profile.photos[0].value : undefined,
      username: email,
      email,
    };
  }

  function buildFromSlackProfile(
    profile: SlackProfile
  ): UserRegistration | null {
    const email = profile.user.email;

    return {
      name: profile.displayName,
      type: 'slack',
      photo: profile.user.image_192,
      username: email,
      email,
      slackUserId: profile.id,
      slackTeamId: profile.team ? profile.team.id : undefined,
    };
  }

  function buildFromMicrosoftProfile(
    profile: MicrosoftProfile
  ): UserRegistration | null {
    const email = profile.emails[0].value;
    return {
      name: profile.displayName,
      type: 'microsoft',
      username: email,
      email,
    };
  }

  function buildFromOktaProfile(profile: OktaProfile): UserRegistration | null {
    const email = profile.email;

    return {
      name: profile.fullName,
      type: 'okta',
      username: email,
      email,
    };
  }

  function logSuccess(provider: string) {
    console.log(chalk`{blue 🔑  {red ${provider}} authentication activated}`);
  }

  // Adding each OAuth provider's strategy to passport
  if (TWITTER_CONFIG) {
    passport.use(new TwitterStrategy(TWITTER_CONFIG, callback('twitter')));
    logSuccess('Twitter');
  }

  if (GOOGLE_CONFIG) {
    passport.use(new GoogleStrategy(GOOGLE_CONFIG, callback('google')));
    logSuccess('Google');
  }

  if (GITHUB_CONFIG) {
    passport.use(new GithubStrategy(GITHUB_CONFIG, callback('github')));
    logSuccess('GitHub');
  }

  if (SLACK_CONFIG) {
    passport.use(new SlackStrategy(SLACK_CONFIG, callback('slack')));
    logSuccess('Slack');
  }

  if (MICROSOFT_CONFIG) {
    passport.use(
      new MicrosoftStrategy(MICROSOFT_CONFIG, callback('microsoft'))
    );
    logSuccess('Microsoft');
  }

  if (OKTA_CONFIG) {
    passport.use(new OktaStrategy(OKTA_CONFIG, callback('okta')));
    logSuccess('Okta');
  }

  passport.use(
    new LocalStrategy(
      { passwordField: 'password', usernameField: 'username' },
      async (
        username: string,
        password: string,
        done: (
          error: string | null,
          user?: UserIds,
          options?: IVerifyOptions
        ) => void
      ) => {
        if (
          username.startsWith('ANONUSER__') &&
          username.endsWith('__ANONUSER')
        ) {
          // Anonymous login

          // Checking if they are allowed in the first place
          if (config.DISABLE_ANONYMOUS_LOGIN) {
            return done('Anonymous accounts are disabled', undefined);
          }

          const actualUsername = username
            .replace('ANONUSER__', '')
            .replace('__ANONUSER', '');
          const identity = await loginAnonymous(actualUsername, password);
          done(
            identity ? null : 'Anonymous account not valid',
            identity ? identity.toIds() : undefined
          );
        } else {
          // Regular account login

          // Checking if they are allowed in the first place
          if (config.DISABLE_PASSWORD_LOGIN) {
            return done('Password accounts are disabled', undefined);
          }

          const identity = await loginUser(username, password);
          done(
            !identity ? 'User cannot log in' : null,
            identity ? identity.toIds() : undefined
          );
        }
      }
    )
  );
};
