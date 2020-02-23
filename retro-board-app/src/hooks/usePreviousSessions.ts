import { findIndex } from 'lodash';
import { User } from 'retro-board-common';
import { getItem, setItem } from '../utils/localStorage';
import useUser from '../auth/useUser';

interface SessionStore {
  [username: string]: Session[];
}

interface Session {
  id: string;
  lastJoin: number;
  name?: string;
}

function getPreviousSessions(username: string | null): Session[] {
  if (!username) {
    return [];
  }

  const store = getStore();
  return store[username] || [];
}

function getStore(): SessionStore {
  const item = getItem('sessions');
  if (item) {
    const store = JSON.parse(item) as SessionStore;
    return store || {};
  }

  return {};
}

function addToPreviousSessions(id: string, name: string, username: User) {
  const store = getStore();
  const sessions = store[username.id] || [];
  const currentIndex = findIndex(sessions, session => session.id === id);
  const newSession: Session = {
    id,
    name,
    lastJoin: new Date().valueOf(),
  };
  if (currentIndex === -1) {
    sessions.unshift(newSession);
  } else {
    sessions.splice(currentIndex, 1);
    sessions.unshift(newSession);
  }
  const newStore = {
    ...store,
    [username.id]: sessions.slice(0, 20),
  };
  setItem('sessions', JSON.stringify(newStore));
}

export default () => {
  const user = useUser();

  if (user) {
    const previousSessions = getPreviousSessions(user.id);
    return { previousSessions, addToPreviousSessions };
  }

  return { previousSessions: [], addToPreviousSessions };
};
