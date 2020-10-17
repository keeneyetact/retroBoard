import { Store } from 'src/types';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/db/entities';

export default async function loginUser(
  store: Store,
  username: string,
  password: string
): Promise<UserEntity | null> {
  const user = await store.getUserByUsername(username);
  if (!user || user.password === null) {
    return null;
  }
  const isPasswordCorrect = await compare(password, user.password);
  return isPasswordCorrect ? user : null;
}
