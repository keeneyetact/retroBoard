import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import shortid from 'shortid';
import { withRouter, RouteComponentProps } from 'react-router-dom';
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

interface HomeProps extends RouteComponentProps {}

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

function Home(props: HomeProps) {
  const translations = useTranslations();
  const createSession = useCallback(
    async (options: SessionOptions, columns: ColumnDefinition[]) => {
      const id = shortid();
      const response = await fetch(`/api/create/${id}`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({ options, columns }),
      });
      if (response.ok) {
        props.history.push(`/game/${id}`);
      }
    },
    [props.history]
  );
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const onCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);
  const onOpenModal = useCallback(() => {
    setModalOpen(true);
  }, []);
  const createDefaultSession = useCallback(() => {
    props.history.push('/game/' + shortid());
  }, [props.history]);
  return (
    <>
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
          <Fab
            variant="extended"
            onClick={createDefaultSession}
            size="large"
            color="secondary"
          >
            <ThumbUpAlt className={classes.buttonIcon} />
            {translations.Join.standardTab.button}
          </Fab>
          <Button onClick={onOpenModal} color="primary">
            <Settings className={classes.buttonIcon} />
            {translations.Join.standardTab.customizeButton}
          </Button>
          <CreateSessionModal
            open={modalOpen}
            onClose={onCloseModal}
            onLaunch={createSession}
          />
        </CardActions>
      </MainCard>
      <MainCard>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {translations.Join.previousTab.header}
          </Typography>
          <PreviousGames />
        </CardContent>
      </MainCard>
    </>
  );
}

const MainCard = styled(Card)`
  max-width: 800px;
  margin: auto;
  margin-bottom: 20px;
`;
export default withRouter(Home);
