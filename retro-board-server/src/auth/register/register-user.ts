import { RegisterPayload, User } from 'retro-board-common';
import { Store } from '../../types';
import { v4 } from 'uuid';
import { hashPassword } from '../../utils';
import UserEntity from '../../db/entities/User';

export default async function registerUser(
  store: Store,
  details: RegisterPayload
): Promise<UserEntity | null> {
  const existingUser = await store.getUserByUsername(details.username);
  if (existingUser) {
    return null;
  }
  const hashedPassword = await hashPassword(details.password);
  const newUser = new UserEntity(v4(), details.name, hashedPassword);
  newUser.language = details.language;
  newUser.username = details.username;
  newUser.email = details.username;
  newUser.emailVerification = v4();
  newUser.accountType = 'password';

  const persistedUser = await store.getOrSaveUser(newUser);
  return persistedUser;
}
