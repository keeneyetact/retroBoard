import { useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoginContent from './LoginContent';

interface LoginModalProps {
  backdrop?: boolean;
  large?: boolean;
  onClose: () => void;
}

export default function LoginModal({
  onClose,
  backdrop = true,
  large = false,
}: LoginModalProps) {
  const fullScreen = useMediaQuery('(max-width:600px)');

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return (
    <Dialog
      fullScreen={fullScreen}
      maxWidth={large ? 'xl' : 'sm'}
      fullWidth
      open
      onClose={handleClose}
      hideBackdrop={!backdrop}
    >
      <LoginContent onClose={handleClose} anonymous />
    </Dialog>
  );
}
