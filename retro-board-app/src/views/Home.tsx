import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {
  Fab,
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  makeStyles,
  colors,
  Button,
} from '@material-ui/core';
import { ThumbUpAlt, Settings } from '@material-ui/icons';
import useTranslations from '../translations';
import PreviousGames from './home/PreviousGames';
import CreateSessionModal from './home/CreateSession';
import logo from './home/logo.png';
import { SessionOptions, ColumnDefinition } from 'retro-board-common';
import { trackEvent } from './../track';
import { createGame } from '../api';
import { Page } from '../components/Page';
import usePreviousSessions from '../hooks/usePreviousSessions';
import useUser from '../auth/useUser';

const useStyles = makeStyles({
  media: {
    objectFit: 'cover',
    backgroundColor: colors.grey[200],
  },
  actions: {
    justifyContent: 'center',
    margin: 20,
  },
  buttonIcon: {
    marginRight: 10,
  },
});

function Home() {
  const history = useHistory();
  const user = useUser();
  const isLoggedIn = !!user;
  const translations = useTranslations();
  const hasPreviousSessions = usePreviousSessions().length > 0;
  const createSession = useCallback(
    async (options: SessionOptions, columns: ColumnDefinition[]) => {
      const session = await createGame(options, columns);
      if (session) {
        trackEvent('custom-modal/create');
        history.push(`/game/${session.id}`);
      } else {
        trackEvent('custom-modal/fail');
      }
    },
    [history]
  );
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const onCloseModal = useCallback(() => {
    setModalOpen(false);
    trackEvent('custom-modal/close');
  }, []);
  const onOpenModal = useCallback(() => {
    setModalOpen(true);
    trackEvent('custom-modal/open');
  }, []);
  const createDefaultSession = useCallback(async () => {
    const session = await createGame();
    trackEvent('home/create/default');
    history.push('/game/' + session.id);
  }, [history]);

  return (
    <Page>
      <MainCard>
        <CardMedia
          className={classes.media}
          image={logo}
          component="img"
          title="Retrospected"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {translations.Join.welcome}
          </Typography>
          <Typography component="p">
            {translations.Join.standardTab.text}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <LaunchButtons>
            <Fab
              variant="extended"
              onClick={createDefaultSession}
              size="large"
              color="secondary"
              disabled={!isLoggedIn}
            >
              <ThumbUpAlt className={classes.buttonIcon} />
              {translations.Join.standardTab.button}
            </Fab>
            <Button
              onClick={onOpenModal}
              color="primary"
              disabled={!isLoggedIn}
            >
              <Settings className={classes.buttonIcon} />
              {translations.Join.standardTab.customizeButton}
            </Button>
          </LaunchButtons>
          <CreateSessionModal
            open={modalOpen}
            onClose={onCloseModal}
            onLaunch={createSession}
          />
        </CardActions>
      </MainCard>
      {hasPreviousSessions && (
        <MainCard>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {translations.Join.previousTab.header}
            </Typography>
            <PreviousGames />
          </CardContent>
        </MainCard>
      )}
    </Page>
  );
}

const MainCard = styled(Card)`
  max-width: 800px;
  margin: auto;
  margin-bottom: 20px;
`;

const LaunchButtons = styled.div`
  display: flex;
  > button {
    margin: 0 10px;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    > button {
      margin: 0;
    }
    > button:last-child {
      margin-top: 20px;
    }
  }
`;

export default Home;
