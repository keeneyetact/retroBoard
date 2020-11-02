import {
  Session,
  Post,
  SessionOptions,
  ColumnDefinition,
  Vote,
  SessionMetadata,
  PostGroup,
  Plan,
  Currency,
} from 'retro-board-common';
import {
  SessionTemplateEntity,
  SubscriptionEntity,
  UserView,
} from './db/entities';
import UserEntity from './db/entities/User';

export interface Store {
  getSession: (userId: string | null, key: string) => Promise<Session | null>;
  getUser: (id: string) => Promise<UserEntity | null>;
  getUserView: (id: string) => Promise<UserView | null>;
  getUserByUsername: (username: string) => Promise<UserEntity | null>;
  getDefaultTemplate: (userId: string) => Promise<SessionTemplateEntity | null>;
  create: (author: UserEntity) => Promise<Session>;
  createCustom: (
    options: SessionOptions,
    columns: ColumnDefinition[],
    setDefault: boolean,
    author: UserEntity
  ) => Promise<Session>;
  saveSession: (userId: string, session: Session) => Promise<void>;
  getOrSaveUser: (user: UserEntity) => Promise<UserEntity>;
  updateUser: (
    userId: string,
    updatedFields: Partial<UserEntity>
  ) => Promise<UserView | null>;
  savePost: (userId: string, sessionId: string, post: Post) => Promise<void>;
  savePostGroup: (
    userId: string,
    sessionId: string,
    group: PostGroup
  ) => Promise<void>;
  saveVote: (
    userId: string,
    sessionId: string,
    postId: string,
    vote: Vote
  ) => Promise<void>;
  deletePost: (
    userId: string,
    sessionId: string,
    postId: string
  ) => Promise<void>;
  deletePostGroup: (
    userId: string,
    sessionId: string,
    groupId: string
  ) => Promise<void>;
  previousSessions: (userId: string) => Promise<SessionMetadata[]>;
  deleteSession: (userId: string, sessionId: string) => Promise<boolean>;
  updateOptions: (
    session: Session,
    options: SessionOptions
  ) => Promise<SessionOptions>;
  updateColumns: (
    session: Session,
    columns: ColumnDefinition[]
  ) => Promise<ColumnDefinition[]>;
  updateName: (sessionId: string, name: string) => Promise<void>;
  activateSubscription: (
    userId: string,
    stripeSubscriptionId: string,
    plan: Plan,
    domain: string | null,
    currency: Currency
  ) => Promise<SubscriptionEntity>;
  cancelSubscription: (
    stripeSubscriptionId: string
  ) => Promise<SubscriptionEntity>;
}

export interface Configuration {
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
  REDIS_ENABLED: boolean;
  REDIS_HOST: string;
  REDIS_PORT: number;
  BACKEND_PORT: number;
  SQL_LOG: boolean;
  BASE_URL: string;
  SENTRY_URL: string;
  TWITTER_KEY: string;
  TWITTER_SECRET: string;
  GOOGLE_KEY: string;
  GOOGLE_SECRET: string;
  GITHUB_KEY: string;
  GITHUB_SECRET: string;
  SENDGRID_API_KEY: string;
  SENDGRID_SENDER: string;
  STRIPE_SECRET: string;
  STRIPE_WEBHOOK_SECRET: string;
}
