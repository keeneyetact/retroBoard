import { Request } from 'express';
import { User } from 'retro-board-common';
import { Store } from './types';
import { genSalt, hash } from 'bcrypt';
import { UserEntity } from './db/entities';

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
