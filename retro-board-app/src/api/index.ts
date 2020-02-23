import shortid from 'shortid';
import { SessionOptions, ColumnDefinition, User } from 'retro-board-common';

export async function createCustomGame(
  options: SessionOptions,
  columns: ColumnDefinition[]
): Promise<string | null> {
  const id = shortid();
  const response = await fetch(`/api/create/${id}`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify({ options, columns }),
  });
  if (response.ok) {
    return id;
  }
  return null;
}

export async function me(): Promise<User | null> {
  const response = await fetch('/api/me', {
    credentials: 'same-origin'
  });
  if (response.ok) {
    return (await response.json()) as User;
  }
  return null;
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

export async function anonymousLogin(
  username: string,
): Promise<User | null> {
  const response = await fetch(`/api/anonymous/login`, {
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