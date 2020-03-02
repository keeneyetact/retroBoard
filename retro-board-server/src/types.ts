import {
  Session,
  Post,
  SessionOptions,
  ColumnDefinition,
  Vote,
  User,
} from 'retro-board-common';

export interface Store {
  getSession: (userId: string | null, key: string) => Promise<Session | null>;
  getUser: (id: string) => Promise<User | null>;
  create: (
    options: SessionOptions | null,
    columns: ColumnDefinition[] | null,
    author: User
  ) => Promise<Session>;
  saveSession: (userId: string, session: Session) => Promise<void>;
  getOrSaveUser: (user: User) => Promise<User>;
  savePost: (userId: string, sessionId: string, post: Post) => Promise<void>;
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
  previousSessions: (userId: string) => Promise<Session[]>;
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
}
