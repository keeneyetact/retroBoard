import {
  SessionOptions,
  ColumnDefinition,
  User,
  Session,
} from 'retro-board-common';

export async function createGame(
  options?: SessionOptions,
  columns?: ColumnDefinition[]
): Promise<Session> {
  const response = await fetch(`/api/create`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify({
      options: options || null,
      columns: columns || null,
    }),
  });
  if (response.ok) {
    return await response.json();
  }
  throw new Error('Could not create a session');
}

export async function me(): Promise<User | null> {
  const response = await fetch('/api/me', {
    credentials: 'same-origin',
  });
  if (response.ok) {
    return (await response.json()) as User;
  }
  return null;
}

export async function fetchPreviousSessions(): Promise<Session[]> {
  const response = await fetch('/api/previous', {
    credentials: 'same-origin',
  });
  if (response.ok) {
    return (await response.json()) as Session[];
  }
  return Promise.resolve([]);
}

export async function logout() {
  const response = await fetch(`/api/logout`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
  });
  if (response.ok) {
    return true;
  }
  return false;
}

export async function anonymousLogin(username: string): Promise<User | null> {
  const response = await fetch(`/api/auth/anonymous/login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify({ username: username, password: 'foo' }),
  });
  if (response.ok) {
    return await response.json();
  }
  return null;
}

export async function updateLanguage(language: string): Promise<User | null> {
  const response = await fetch(`/api/me/language`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify({ language }),
  });
  if (response.ok) {
    return await response.json();
  }
  return null;
}
