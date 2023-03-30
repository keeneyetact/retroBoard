import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { colors, IconButton } from '@mui/material';
import { Lock, VerifiedUser } from '@mui/icons-material';
import { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import CustomAvatar from '../../../../components/Avatar';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import ProButton from '../../../../components/ProButton';
import useParticipants from '../../useParticipants';
import useSession from '../../useSession';

interface LockSessionProps {
  onLock(locked: boolean): void;
}

function LockSession({ onLock }: LockSessionProps) {
  const { session } = useSession();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const { participants } = useParticipants();
  const fullScreen = useMediaQuery('(max-width:600px)');
  const small = useMediaQuery('(max-width: 500px)');

  const handleLock = useCallback(() => {
    if (session) {
      onLock(!session.locked);
      enqueueSnackbar(
        session.locked
          ? t('Private.unlockSuccessNotification')
          : t('Private.lockSuccessNotification'),
        { variant: 'success' }
      );
    }
    setOpen(false);
  }, [session, onLock, enqueueSnackbar, t]);

  const handleOpenDialog = useCallback(() => {
    if (session && !session.locked) {
      setOpen(true);
    } else {
      handleLock();
    }
  }, [session, handleLock]);

  const handleCloseDialog = useCallback(() => {
    setOpen(false);
  }, []);

  if (!session) {
    return null;
  }

  return (
    <>
      <ProButton>
        {small ? (
          <IconButton onClick={handleOpenDialog} color="secondary">
            {session.locked ? (
              <VerifiedUser style={{ color: colors.red[800] }} />
            ) : (
              <VerifiedUser style={{ color: colors.green[800] }} />
            )}
          </IconButton>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            startIcon={
              session.locked ? (
                <VerifiedUser style={{ color: colors.red[800] }} />
              ) : (
                <VerifiedUser style={{ color: colors.green[800] }} />
              )
            }
            onClick={handleOpenDialog}
          >
            {session.locked
              ? t('Private.unlockButton')
              : t('Private.lockButton')}
          </Button>
        )}
      </ProButton>
      <Dialog
        onClose={handleCloseDialog}
        fullScreen={fullScreen}
        aria-labelledby="lock-session-dialog"
        open={open}
      >
        <DialogTitle id="lock-session-dialog">
          <Lock style={{ position: 'relative', top: 3 }} />
          &nbsp;{t('Private.lockButton')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{t('Private.lockDescription')}</DialogContentText>
        </DialogContent>
        <DialogContent>
          <Users>
            {participants.map((player) => (
              <UserContainer key={player.id}>
                <AvatarContainer>
                  <CustomAvatar user={player} />
                </AvatarContainer>
                <Name>{player.name}</Name>
              </UserContainer>
            ))}
          </Users>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            {t('Private.cancelButton')}
          </Button>
          <Button variant="contained" color="primary" onClick={handleLock}>
            {t('Private.lockButton')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const Users = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 150px;
  padding: 10px;
  flex: 1;
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Name = styled.div`
  display: flex;
  justify-content: center;
  color: ${colors.grey[700]};
  margin-top: 10px;
`;

export default LockSession;
