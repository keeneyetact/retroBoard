import { useState, useCallback } from 'react';

type OpenCloseCallback = () => void;

export default function useOpenClose(
  defaultValue: boolean
): [boolean, OpenCloseCallback, OpenCloseCallback] {
  const [isOpen, setIsOpen] = useState(defaultValue);
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);
  return [isOpen, open, close];
}
