import Datastore from 'nedb';
import path from 'path';
import { Session, Post } from 'retro-board-common';
import { Store } from '../types';

const dbFile = path.resolve(__dirname, '..', 'persist', 'db');

const get = (store: Datastore) => (sessionId: string): Promise<Session> =>
  new Promise((resolve, reject) => {
    store.findOne({ id: sessionId }, (err, session) => {
      if (err) {
        reject(err);
      } else if (session) {
        resolve(session);
      } else {
        resolve({
          id: sessionId,
          name: null,
          posts: [],
        });
      }
    });
  });

const saveSession = (store: Datastore) => (session: Session): Promise<void> =>
  new Promise((resolve, reject) => {
    store.update({ id: session.id }, session, { upsert: true }, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

const savePost = (store: Datastore) => (
  sessionId: string,
  post: Post
): Promise<void> =>
  new Promise((resolve, reject) => {
    store.findOne({ id: sessionId }, (err, session: Session) => {
      if (err) {
        reject(err);
      } else if (session) {
        const existingPostIndex = session.posts.findIndex(
          p => p.id === post.id
        );
        if (existingPostIndex > -1) {
          session.posts = [
            ...session.posts.slice(0, existingPostIndex),
            post,
            ...session.posts.slice(existingPostIndex + 1),
          ];
        } else {
          session.posts.push(post);
        }
        store.update({ id: session.id }, session, { upsert: true }, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      } else {
        const session: Session = {
          id: sessionId,
          name: null,
          posts: [],
        };
        session.posts.push(post);
        store.update({ id: session.id }, session, { upsert: true }, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  });

const deletePost = (store: Datastore) => (
  sessionId: string,
  postId: string
): Promise<void> =>
  new Promise((resolve, reject) => {
    store.findOne({ id: sessionId }, (err, session: Session) => {
      if (err) {
        reject(err);
      } else if (session) {
        session.posts = session.posts.filter(p => p.id !== postId);
        store.update({ id: session.id }, session, { upsert: true }, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      } else {
        reject(`No session found with this id: ${sessionId}`);
      }
    });
  });

export default function db() {
  const store = new Datastore({ filename: dbFile, autoload: true });
  return Promise.resolve<Store>({
    get: get(store),
    saveSession: saveSession(store),
    savePost: savePost(store),
    deletePost: deletePost(store),
  });
}
