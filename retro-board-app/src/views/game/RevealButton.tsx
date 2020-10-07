import React, { useCallback, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import useTranslation from '../../translations/useTranslations';

interface RevealButtonProps {
  onClick: () => void;
}

function RevealButton({ onClick }: RevealButtonProps) {
  const { RevealCards } = useTranslation();
  const handleOpenDialog = useCallback(() => {
    setRevealDialogOpen(true);
  }, []);
  const handleCloseDialog = useCallback(() => {
    setRevealDialogOpen(false);
  }, []);
  const [revealDialogOpen, setRevealDialogOpen] = useState(false);
  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<Visibility />}
        onClick={handleOpenDialog}
      >
        {RevealCards.buttonLabel}
      </Button>
      <Dialog
        onClose={handleCloseDialog}
        aria-labelledby="reveal-cards-dialog"
        open={revealDialogOpen}
      >
        <DialogTitle id="reveal-cards-dialog">
          {RevealCards.dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{RevealCards.dialogContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            {RevealCards.cancelButton}
          </Button>
          <Button variant="contained" color="primary" onClick={onClick}>
            {RevealCards.confirmButton}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RevealButton;
