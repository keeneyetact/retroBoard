import { Session, Post } from 'retro-board-common';

export interface Store {
  get: (key: string) => Promise<Session>;
  saveSession: (session: Session) => Promise<void>;
  savePost: (sessionId: string, post: Post) => Promise<void>;
  deletePost: (sessionId: string, postId: string) => Promise<void>;
}

export interface Configuration {
  DB_TYPE: 'postgres' | 'nedb';
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
  BACKEND_PORT: number;
  SQL_LOG: boolean;
}
