import useGlobalState from '../state';
import { CHECK_PREFIX, decrypt } from './crypto';
import { useEncryptionKey } from './useEncryptionKey';

export default function useCanDecrypt() {
  const { state } = useGlobalState();
  const [key] = useEncryptionKey();

  if (!state.session || !state.session.encrypted) {
    return true;
  }

  return decrypt(state.session.encrypted, key) === CHECK_PREFIX;
}
