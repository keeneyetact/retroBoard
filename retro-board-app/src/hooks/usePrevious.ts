import { useRef, useEffect } from 'react';

/**
 * Whatches a value and returns its previous value when it changes.
 * Returns the same value initially.
 * @param value Item to watch
 */
export default function usePrevious<T>(value: T): T {
  const current = useRef<T>(value);
  const previous = useRef<T>(value);
  useEffect(() => {
    if (value !== current.current) {
      previous.current = current.current;
      current.current = value;
    }
  }, [value]);
  return previous.current;
}
