import { Store } from "src/types";
import { UserEntity } from "../../db/entities";
import { v4 } from "uuid";

export default async function loginAnonymous(store: Store, username: string): Promise<UserEntity> {
  const actualUsername = username.split('^')[0];
  const existingUser = await store.getUserByUsername(username);
  if (existingUser) {
    return existingUser;
  }
  const user = new UserEntity(v4(), actualUsername);
  user.username = username;
  user.language = 'en';
  
  const dbUser = await store.getOrSaveUser(user);
  return dbUser;
}