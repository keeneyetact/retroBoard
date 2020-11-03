import { UserEntity } from '../../db/entities';
import { v4 } from 'uuid';
import { Connection } from 'typeorm';
import { getUserByUsername, getOrSaveUser } from '../../db/actions/users';

export default async function loginAnonymous(
  connection: Connection,
  username: string
): Promise<UserEntity> {
  const actualUsername = username.split('^')[0];
  const existingUser = await getUserByUsername(connection, username);
  if (existingUser) {
    return existingUser;
  }
  const user = new UserEntity(v4(), actualUsername);
  user.username = username;
  user.language = 'en';

  const dbUser = await getOrSaveUser(connection, user);
  return dbUser;
}
