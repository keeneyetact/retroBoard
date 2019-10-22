import React, { useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import MaxVoteSlider from './components/MaxVoteSlider';
import BooleanOption from './components/BooleanOption';
import EditableLabel from '../../components/EditableLabel';
import { SessionOptions } from 'retro-board-common';
import OptionItem from './components/OptionItem';
import useTranslations from '../../translations';

interface CreateSessionModalProps {
  open: boolean;
  onClose: () => void;
  onLaunch: (options: SessionOptions) => void;
}

const CreateSessionModal = ({
  open,
  onClose,
  onLaunch,
}: CreateSessionModalProps) => {
  const translations = useTranslations();
  const [maxUpVotes, setMaxUpVotes] = useState<number | null>(null);
  const [maxDownVotes, setMaxDownVotes] = useState<number | null>(null);
  const [allowActions, setAllowActions] = useState<boolean>(true);
  const [allowSelfVoting, setAllowSelfVoting] = useState<boolean>(false);
  const [allowMultipleVotes, setAllowMultipleVotes] = useState<boolean>(false);
  const [wellLabel, setWellLabel] = useState<string | null>(null);
  const [notWellLabel, setNotWellLabel] = useState<string | null>(null);
  const [ideasLabel, setIdeasLabel] = useState<string | null>(null);
  const handleLaunch = useCallback(() => {
    onLaunch({
      allowActions,
      allowMultipleVotes,
      allowSelfVoting,
      maxDownVotes,
      maxUpVotes,
      wellLabel,
      notWellLabel,
      ideasLabel,
    });
  }, [
    onLaunch,
    allowActions,
    allowMultipleVotes,
    allowSelfVoting,
    maxDownVotes,
    maxUpVotes,
    wellLabel,
    notWellLabel,
    ideasLabel,
  ]);
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>New Game with Custom Rules</DialogTitle>
      <DialogContent>
        <OptionItem
          label="Max Up Votes"
          help="Maximum number of 'likes' votes a user is allowed to cast"
        >
          <MaxVoteSlider value={maxUpVotes} onChange={setMaxUpVotes} />
        </OptionItem>
        <OptionItem
          label="Max Down Votes"
          help="Maximum number of 'dislikes' votes a user is allowed to cast"
        >
          <MaxVoteSlider value={maxDownVotes} onChange={setMaxDownVotes} />
        </OptionItem>
        <OptionItem
          label="Allow Actions"
          help="Whether to allow the 'Action' (follow-up) field on each post"
        >
          <BooleanOption value={allowActions} onChange={setAllowActions} />
        </OptionItem>
        <OptionItem
          label="Allow Self Voting"
          help="Whether to allow a user to vote on their own post"
        >
          <BooleanOption
            value={allowSelfVoting}
            onChange={setAllowSelfVoting}
          />
        </OptionItem>
        <OptionItem
          label="Allow Multiple Votes"
          help="Whether to allow a user to vote multiple times on the same post"
        >
          <BooleanOption
            value={allowMultipleVotes}
            onChange={setAllowMultipleVotes}
          />
        </OptionItem>
        <OptionItem
          label="First Column Label"
          help="Change the name of the first column"
        >
          <Typography>
            <EditableLabel
              value={wellLabel || ''}
              onChange={setWellLabel}
              placeholder={translations.PostBoard.wellQuestion}
            />
          </Typography>
        </OptionItem>
        <OptionItem
          label="Second Column Label"
          help="Change the name of the second column"
        >
          <Typography>
            <EditableLabel
              value={notWellLabel || ''}
              onChange={setNotWellLabel}
              placeholder={translations.PostBoard.notWellQuestion}
            />
          </Typography>
        </OptionItem>
        <OptionItem
          label="Third Column Label"
          help="Change the name of the third column"
        >
          <Typography>
            <EditableLabel
              value={ideasLabel || ''}
              onChange={setIdeasLabel}
              placeholder={translations.PostBoard.ideasQuestion}
            />
          </Typography>
        </OptionItem>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLaunch} color="primary" variant="contained">
          Start the game!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateSessionModal;
