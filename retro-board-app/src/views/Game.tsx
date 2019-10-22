import React, { useMemo } from 'react';
import {
  SentimentSatisfied,
  SentimentVeryDissatisfied,
  WbSunny,
} from '@material-ui/icons';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { PostType } from 'retro-board-common';
import useTranslations from '../translations';
import useGlobalState from '../state';
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
  const { wellLabel, notWellLabel, ideasLabel, posts } = session;

  const {
    initialised,
    onAddPost,
    onDeletePost,
    onEditPost,
    onLike,
    onRenameSession,
  } = useGame(gameId);

  const columns: ColumnContent[] = useMemo(
    () => [
      {
        type: PostType.Well,
        posts: posts.filter(p => p.postType === PostType.Well),
        icon: SentimentSatisfied,
        label: wellLabel || translations.PostBoard.wellQuestion,
        color: '#E8F5E9',
      },
      {
        type: PostType.NotWell,
        posts: posts.filter(p => p.postType === PostType.NotWell),
        icon: SentimentVeryDissatisfied,
        label: notWellLabel || translations.PostBoard.notWellQuestion,
        color: '#FFEBEE',
      },
      {
        type: PostType.Ideas,
        posts: posts.filter(p => p.postType === PostType.Ideas),
        icon: WbSunny,
        label: ideasLabel || translations.PostBoard.ideasQuestion,
        color: '#FFFDE7',
      },
    ],
    [posts, translations.PostBoard, wellLabel, notWellLabel, ideasLabel]
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
