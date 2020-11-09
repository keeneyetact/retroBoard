import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import useGlobalState from '../state';
import { getStoredEncryptionKey, storeEncryptionKeyLocally } from './crypto';

type UseEncryptionKeyValue = [
  value: string | null,
  setValue: (key: string) => void
];

/**
 * Try to get the encryption key locally
 */
export function useEncryptionKey(
  sessionId: string | null = null
): UseEncryptionKeyValue {
  const { hash } = useLocation();
  const { state } = useGlobalState();
  const actualSessionId = sessionId || state.session?.id || null;

  const storeKey = useCallback(
    (key: string) => {
      storeEncryptionKeyLocally(actualSessionId, key);
    },
    [actualSessionId]
  );

  const result = useMemo((): UseEncryptionKeyValue => {
    const key = hash ? hash.slice(1) : null;
    if (key) {
      return [key, storeKey];
    }

    const localKey = getStoredEncryptionKey(actualSessionId);
    if (localKey) {
      return [localKey, storeKey];
    }

    return [null, storeKey];
  }, [hash, actualSessionId, storeKey]);
  return result;
}
