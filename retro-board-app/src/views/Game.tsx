import React, { useCallback } from 'react';
import styled from 'styled-components';
import {
  useParams,
  Route,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { CircularProgress, AppBar, Tabs, Tab, Button } from '@material-ui/core';
import { Dashboard, List, CloudOff } from '@material-ui/icons';
import useGlobalState from '../state';
import useTranslations from '../translations';
import useGame from './game/useGame';
import GameMode from './game/GameMode';
import SummaryMode from './game/summary/SummaryMode';
import useColumns from './game/useColumns';

interface RouteParams {
  gameId: string;
}

function GamePage() {
  const { GameMenu, PostBoard } = useTranslations();
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const { gameId } = useParams<RouteParams>();
  const { state } = useGlobalState();
  const handleChange = useCallback((_, v) => history.push(v), [history]);
  const columns = useColumns();
  const { session } = state;
  const rootUrl = `${match.url}`;
  const summaryUrl = `${match.url}/summary`;

  const {
    initialised,
    disconnected,
    onAddPost,
    onMovePost,
    onCombinePost,
    onAddGroup,
    onDeletePost,
    onEditPost,
    onDeletePostGroup,
    onEditPostGroup,
    onLike,
    onRenameSession,
    reconnect,
  } = useGame(gameId);

  if (!disconnected && (!session || !initialised)) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  return (
    <div>
      {disconnected ? (
        <DisconnectedContainer>
          <DisconnectedTitle>
            <CloudOff
              style={{ position: 'relative', top: 3, marginRight: 10 }}
            />
            &nbsp;{PostBoard.disconnected}
          </DisconnectedTitle>
          <Button color="secondary" variant="contained" onClick={reconnect}>
            {PostBoard.reconnect}
          </Button>
        </DisconnectedContainer>
      ) : null}
      <AppBar position="static" color="default">
        <Tabs
          value={location.pathname}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="Game mode tabs"
        >
          <Tab label={GameMenu.board} icon={<Dashboard />} value={rootUrl} />
          <Tab label={GameMenu.summary} icon={<List />} value={summaryUrl} />
        </Tabs>
      </AppBar>
      <Route
        path={`${match.url}`}
        exact
        render={() => (
          <GameMode
            columns={columns}
            onEdit={onEditPost}
            onAddPost={onAddPost}
            onMovePost={onMovePost}
            onCombinePost={onCombinePost}
            onAddGroup={onAddGroup}
            onDeletePost={onDeletePost}
            onLike={onLike}
            onDeleteGroup={onDeletePostGroup}
            onEditGroup={onEditPostGroup}
            onRenameSession={onRenameSession}
          />
        )}
      />
      <Route
        path={`${match.url}/summary`}
        render={() => <SummaryMode columns={columns} />}
      />
    </div>
  );
}

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 120px;
`;

const DisconnectedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  height: 100%;
  height: calc(100% - 56px);
  width: 100%;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(3px);
`;

const DisconnectedTitle = styled.h2`
  font-weight: 300;
  text-align: center;
  margin: 0 20px 20px;
`;

export default GamePage;
