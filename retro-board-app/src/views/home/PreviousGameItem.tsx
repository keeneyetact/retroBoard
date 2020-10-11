import React, { useCallback, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  Card as CardBase,
  CardContent,
  Tooltip,
  Typography,
  colors,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContentText,
  DialogContent,
} from '@material-ui/core';
import { SessionMetadata } from 'retro-board-common';
import { AvatarGroup } from '@material-ui/lab';
import CustomAvatar from '../../components/Avatar';
import ItemStat from './ItemStat';
import styled from 'styled-components';
import useOnHover from '../../hooks/useOnHover';
import useTranslations, { useLanguage } from '../../translations';
import { DeleteForever } from '@material-ui/icons';

interface PreviousGameItemProps {
  session: SessionMetadata;
  onClick: (session: SessionMetadata) => void;
  onDelete: (session: SessionMetadata) => void;
}

const PreviousGameItem = ({
  session,
  onClick,
  onDelete,
}: PreviousGameItemProps) => {
  const {
    PreviousGame: translations,
    SessionName: { defaultSessionName },
    DeleteSession,
  } = useTranslations();
  const language = useLanguage();
  const [hover, hoverRef] = useOnHover();
  const handleClick = useCallback(() => {
    onClick(session);
  }, [onClick, session]);
  const handleDelete = useCallback(() => {
    setDeleteDialogOpen(false);
    onDelete(session);
  }, [onDelete, session]);
  const handleOpenDialog = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      event.preventDefault();
      setDeleteDialogOpen(true);
    },
    []
  );
  const handleCloseDialog = useCallback(() => {
    setDeleteDialogOpen(false);
  }, []);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  return (
    <>
      <Card onClick={handleClick} raised={hover} ref={hoverRef}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom component="div">
            <Top>
              <LastUpdated>
                {formatDistanceToNow(
                  Date.parse((session.created as unknown) as string),
                  { locale: language.dateLocale, addSuffix: true }
                )}
              </LastUpdated>
              <Delete>
                {session.canBeDeleted ? (
                  <IconButton onClick={handleOpenDialog}>
                    <DeleteForever />
                  </IconButton>
                ) : null}
              </Delete>
            </Top>
          </Typography>
          <Typography variant="h5" component="h2">
            {session.name || defaultSessionName}
          </Typography>
          <Typography color="textSecondary" style={{ marginBottom: 20 }}>
            {translations.createdBy} <em>{session.createdBy.name}</em>
          </Typography>
          <Stats>
            <ItemStat
              value={session.numberOfPosts}
              label={translations.posts!}
              color={colors.green[500]}
            />
            <ItemStat
              value={session.participants.length}
              label={translations.participants!}
              color={colors.indigo[500]}
            />
            <ItemStat
              value={
                session.numberOfNegativeVotes + session.numberOfPositiveVotes
              }
              label={translations.votes!}
              color={colors.red[500]}
            />
            <ItemStat
              value={session.numberOfActions}
              label={translations.actions!}
              color={colors.amber[500]}
            />
          </Stats>
          <AvatarGroup title={translations.participants!} spacing="small">
            {session.participants.map((user) => {
              return (
                <Tooltip title={user.name} key={user.id}>
                  <span>
                    <CustomAvatar user={user} />
                  </span>
                </Tooltip>
              );
            })}
          </AvatarGroup>
        </CardContent>
      </Card>
      <Dialog
        onClose={handleCloseDialog}
        aria-labelledby="delete-session-dialog"
        open={deleteDialogOpen}
      >
        <DialogTitle id="delete-session-dialog">
          {DeleteSession.header!(session.name || defaultSessionName!)}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{DeleteSession.firstLine}</DialogContentText>
          <DialogContentText>{DeleteSession.secondLine}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{DeleteSession.cancel}</Button>
          <Button
            variant="contained"
            color="inherit"
            style={{ backgroundColor: colors.red[500], color: 'white' }}
            onClick={handleDelete}
          >
            {DeleteSession.yesImSure}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Card = styled(CardBase)`
  width: 500px;
  cursor: pointer;

  @media screen and (max-width: 500px) {
    width: calc(100vw - 40px);
    font-size: 0.5em;
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
  background-color: ${colors.grey[100]};
  margin: 0 -20px 20px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
`;

const LastUpdated = styled.div`
  flex: 1;
`;

const Delete = styled.div`
  svg {
    color: ${colors.red[500]};
  }
  position: relative;
  left: 12px;
`;

export default PreviousGameItem;
