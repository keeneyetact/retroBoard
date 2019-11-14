import useGlobalState from '../state';
import { findIndex } from 'lodash';
import { User } from 'retro-board-common';

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
  const item = localStorage.getItem('sessions');
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
  localStorage.setItem('sessions', JSON.stringify(newStore));
}

export default () => {
  const { state } = useGlobalState();

  if (state.username) {
    const previousSessions = getPreviousSessions(state.username.id);
    return { previousSessions, addToPreviousSessions };
  }

  return { previousSessions: [], addToPreviousSessions };
};
