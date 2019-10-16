import React, { useState, useCallback, useRef, useEffect } from 'react';
import { some } from 'lodash';
import styled from 'styled-components';
import { Button, Typography, makeStyles } from '@material-ui/core';
import {
  ThumbUpOutlined,
  ThumbDownOutlined,
  DeleteForeverOutlined,
  FeedbackOutlined,
  Feedback,
} from '@material-ui/icons';
import useGlobalState from '../../state';
import useTranslations from '../../translations';
import EditableLabel from '../../components/EditableLabel';
import { Palette } from '../../Theme';
import { Post } from 'retro-board-common';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

interface PostItemProps {
  post: Post;
  color: string;
  onLike: () => void;
  onDislike: () => void;
  onEdit: (content: string) => void;
  onEditAction: (action: string) => void;
  onDelete: () => void;
}

const useStyles = makeStyles(theme => ({
  actionContainer: {
    backgroundColor: theme.palette.grey[100],
  },
  actionIcon: {
    color: theme.palette.primary.main,
  },
}));

const PostItem = ({
  post,
  color,
  onLike,
  onDislike,
  onEdit,
  onEditAction,
  onDelete,
}: PostItemProps) => {
  const { state } = useGlobalState();
  const classes = useStyles();
  const { Actions: translations } = useTranslations();
  const [actionsToggled, setActionToggled] = useState(false);
  const actionInput = useRef<EditableLabel>(null);
  const toggleActionPanel = useCallback(() => {
    setActionToggled(!actionsToggled);
  }, [actionsToggled]);
  useEffect(() => {
    console.log(actionsToggled, actionInput.current);
    if (actionsToggled && actionInput.current && !post.action) {
      actionInput.current.focus();
    }
  }, [actionsToggled, actionInput, post]);
  const displayAction = actionsToggled || !!post.action;
  const user = state.username;
  const isAuthor = user ? user.id === post.user.id : false;
  const hasVotedOrAuthor =
    some(post.likes, u => u.id === (user ? user.id : -1)) ||
    some(post.dislikes, u => u.id === (user ? user.id : -1)) ||
    isAuthor;
  return (
    <PostCard>
      <CardContent>
        <Typography variant="body1">
          <EditableLabel
            readOnly={!isAuthor}
            value={post.content}
            onChange={onEdit}
            label="Post content"
            multiline
          />
        </Typography>
      </CardContent>
      {displayAction && (
        <CardContent className={classes.actionContainer}>
          <Typography variant="caption">{translations.title}:</Typography>
          <Typography variant="body1">
            <EditableLabel
              value={post.action || ''}
              onChange={onEditAction}
              label={translations.title}
              ref={actionInput}
              multiline
            />
          </Typography>
        </CardContent>
      )}
      <CardActions style={{ backgroundColor: color }}>
        <Button onClick={onLike} disabled={hasVotedOrAuthor} aria-label="Like">
          <ThumbUpOutlined style={{ color: Palette.positive }} />
          &nbsp;{post.likes.length}
        </Button>
        <Button
          onClick={onDislike}
          disabled={hasVotedOrAuthor}
          aria-label="Dislike"
        >
          <ThumbDownOutlined style={{ color: Palette.negative }} />
          &nbsp;{post.dislikes.length}
        </Button>
        {isAuthor && (
          <Button onClick={onDelete} aria-label="Delete">
            <DeleteForeverOutlined style={{ color: Palette.negative }} />
          </Button>
        )}
        <Button
          onClick={toggleActionPanel}
          aria-label={translations.label}
          title={translations.tooltip}
          disabled={!!post.action}
        >
          {post.action ? (
            <Feedback className={classes.actionIcon} />
          ) : (
            <FeedbackOutlined className={classes.actionIcon} />
          )}
        </Button>
      </CardActions>
    </PostCard>
  );
};

const PostCard = styled(Card)`
  margin: 10px 5px;
  margin-bottom: 20px;
`;

export default PostItem;
