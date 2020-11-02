import { Request } from 'express';
import { Store } from './types';
import { genSalt, hash } from 'bcrypt';
import { UserView, UserEntity } from './db/entities';

export async function getUserView(
  store: Store,
  request: Request
): Promise<UserView | null> {
  if (request.user) {
    const user = await store.getUserView(request.user);
    return user;
  }
  return null;
}

export async function getUser(
  store: Store,
  request: Request
): Promise<UserEntity | null> {
  if (request.user) {
    const user = await store.getUser(request.user);
    return user;
  }
  return null;
}

export async function hashPassword(clearTextPassword: string): Promise<string> {
  const salt = await genSalt();
  const hashedPassword = await hash(clearTextPassword, salt);
  return hashedPassword;
}
