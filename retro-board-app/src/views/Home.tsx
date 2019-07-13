import React, { useCallback } from 'react';
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
} from '@material-ui/core';
import { ThumbUpAlt } from '@material-ui/icons';
import useTranslations from '../translations';
import PreviousGames from './home/PreviousGames';
import logo from './home/logo.png';

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
  const createSession = useCallback(() => {
    props.history.push('/game/' + shortid());
  }, [props.history]);
  const classes = useStyles();
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
            onClick={createSession}
            size="large"
            color="secondary"
          >
            <ThumbUpAlt className={classes.buttonIcon} />
            {translations.Join.standardTab.button}
          </Fab>
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
