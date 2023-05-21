import { Alert, AlertColor, AlertTitle } from '@mui/material';
import { useState, useCallback } from 'react';

type ClosableAlertProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
  severity: AlertColor;
  closable?: boolean;
  id?: string;
  persisted?: boolean;
};

export default function ClosableAlert({
  title,
  children,
  severity,
  closable,
  id,
  persisted,
}: ClosableAlertProps) {
  const [open, setOpen] = useState(loadInitial(id));

  const handleClose = useCallback(() => {
    if (!closable) return;
    setOpen(false);
    if (persisted && id) {
      localStorage.setItem(computeKey(id), 'done');
    }
  }, [id, persisted, closable]);

  if (persisted && !id) {
    throw Error('ClosableAlert with persisted=true must have an id');
  }

  if (!open) return null;

  return (
    <Alert severity={severity} onClose={handleClose}>
      <AlertTitle>{title}</AlertTitle>
      {children}
    </Alert>
  );
}

function computeKey(id: string) {
  return 'closable-alert-' + id;
}

function loadInitial(id?: string) {
  if (!id) return true;
  const initial = localStorage.getItem(computeKey(id));
  if (initial) {
    return initial !== 'done';
  }
  return true;
}
