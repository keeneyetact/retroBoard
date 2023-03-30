import { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Visibility } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { IconButton, useMediaQuery } from '@mui/material';

interface RevealButtonProps {
  onClick: () => void;
}

function RevealButton({ onClick }: RevealButtonProps) {
  const { t } = useTranslation();
  const small = useMediaQuery('(max-width: 500px)');
  const [revealDialogOpen, setRevealDialogOpen] = useState(false);
  const handleOpenDialog = useCallback(() => {
    setRevealDialogOpen(true);
  }, []);
  const handleCloseDialog = useCallback(() => {
    setRevealDialogOpen(false);
  }, []);
  return (
    <>
      {small ? (
        <IconButton onClick={handleOpenDialog} color="secondary">
          <Visibility />
        </IconButton>
      ) : (
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<Visibility />}
          onClick={handleOpenDialog}
        >
          {t('RevealCards.buttonLabel')}
        </Button>
      )}
      <Dialog
        onClose={handleCloseDialog}
        aria-labelledby="reveal-cards-dialog"
        open={revealDialogOpen}
      >
        <DialogTitle id="reveal-cards-dialog">
          {t('RevealCards.dialogTitle')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('RevealCards.dialogContent')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            {t('RevealCards.cancelButton')}
          </Button>
          <Button variant="contained" color="primary" onClick={onClick}>
            {t('RevealCards.confirmButton')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RevealButton;
