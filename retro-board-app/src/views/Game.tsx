import React, { useMemo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import useTranslations from '../translations';
import useGlobalState from '../state';
import { extrapolate } from '../state/columns';
import useGame from './game/useGame';
import GameMode from './game/GameMode';
import SummaryMode from './game/SummaryMode';
import { ColumnContent } from './game/types';

interface Route {
  gameId: string;
}
interface GameProps extends RouteComponentProps<Route> {}

function GamePage({
  match: {
    params: { gameId },
  },
}: GameProps) {
  const translations = useTranslations();
  const { state } = useGlobalState();
  const { summaryMode, session } = state;
  const { posts } = session;

  const {
    initialised,
    onAddPost,
    onDeletePost,
    onEditPost,
    onLike,
    onRenameSession,
  } = useGame(gameId);

  const columns: ColumnContent[] = useMemo(
    () =>
      session.columns
        .map(col => extrapolate(col, translations))
        .map(
          (col, index) =>
            ({
              index,
              posts: posts.filter(p => p.column === index),
              ...col,
            } as ColumnContent)
        ),
    [posts, session.columns, translations]
  );

  return (
    <div>
      {initialised && !summaryMode && (
        <GameMode
          columns={columns}
          onEdit={onEditPost}
          onAddPost={onAddPost}
          onDeletePost={onDeletePost}
          onLike={onLike}
          onRenameSession={onRenameSession}
        />
      )}
      {initialised && summaryMode && <SummaryMode columns={columns} />}
    </div>
  );
}

export default withRouter(GamePage);
