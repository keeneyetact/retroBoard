import React, { useState, useCallback, useMemo, useRef } from 'react';
import styled from 'styled-components';
import {
  Button,
  Typography,
  makeStyles,
  Popover,
  Card,
  CardActions,
  CardContent,
  colors,
} from '@material-ui/core';
import {
  ThumbUpOutlined,
  ThumbDownOutlined,
  DeleteForeverOutlined,
  FeedbackOutlined,
  Feedback,
  Close,
  EmojiEmotions,
  DragIndicator,
} from '@material-ui/icons';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import useTranslations from '../../translations';
import EditableLabel from '../../components/EditableLabel';
import { Palette } from '../../Theme';
import { Post } from 'retro-board-common';
import { useUserPermissions } from './useUserPermissions';
import { countVotes, enumerateVotes } from './utils';
import GiphySearchBox from 'react-giphy-searchbox';
import useGiphy from '../../hooks/useGiphy';
import config from '../../utils/getConfig';
import useToggle from '../../hooks/useToggle';
import VoteButton from './VoteButton';

interface PostItemProps {
  index: number;
  post: Post;
  color: string;
  onLike: () => void;
  onDislike: () => void;
  onEdit: (content: string) => void;
  onEditAction: (action: string) => void;
  onEditGiphy: (giphyId: string | null) => void;
  onDelete: () => void;
}

const useStyles = makeStyles(theme => ({
  actionContainer: {
    backgroundColor: theme.palette.grey[100],
  },
  actionIcon: {
    color: theme.palette.primary.main,
  },
  ghipyIcon: {
    color: colors.yellow[700],
  },
}));

const PostItem = ({
  index,
  post,
  color,
  onLike,
  onDislike,
  onEdit,
  onEditAction,
  onEditGiphy,
  onDelete,
}: PostItemProps) => {
  const {
    canCreateAction,
    canEdit,
    canDelete,
    canUpVote,
    canDownVote,
    canShowAuthor,
  } = useUserPermissions(post);
  const classes = useStyles();
  const { Actions: translations, Post: postTranslations } = useTranslations();
  const giphyImageUrl = useGiphy(post.giphy);
  const postElement = useRef(null);
  const [actionsToggled, toggleAction] = useToggle(false);
  const [showGiphyEditor, setShowGiphyEditor] = useState(false);
  const [showGiphyImage, toggleShowGiphyImage] = useToggle(true);
  const upVotes = useMemo(() => countVotes(post, 'like'), [post]);
  const downVotes = useMemo(() => countVotes(post, 'dislike'), [post]);
  const upVoters = useMemo(() => enumerateVotes(post, 'like'), [post]);
  const downVoters = useMemo(() => enumerateVotes(post, 'dislike'), [post]);
  const displayAction = actionsToggled || !!post.action;
  const handleShowGiphy = useCallback(() => {
    setShowGiphyEditor(true);
  }, []);
  const handleHideGiphyEditor = useCallback(() => {
    setShowGiphyEditor(false);
  }, []);
  const handleChooseGiphyEditor = useCallback(
    (giphyItem: any) => {
      onEditGiphy(giphyItem.id);
    },
    [onEditGiphy]
  );
  return (
    <>
      <Draggable draggableId={post.id} index={index}>
        {(provided: DraggableProvided) => (
          <PostCard ref={provided.innerRef} {...provided.draggableProps}>
            <DragHandle {...provided.dragHandleProps}>
              <DragIndicator />
            </DragHandle>
            <CardContent>
              <Typography variant="body1">
                <EditableLabel
                  readOnly={!canEdit}
                  value={post.content}
                  onChange={onEdit}
                  label="Post content"
                  multiline
                />
              </Typography>
              {canShowAuthor && (
                <AuthorContainer>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    component="div"
                  >
                    {postTranslations.by}&nbsp;
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textPrimary"
                    component="div"
                  >
                    {post.user.name}
                  </Typography>
                </AuthorContainer>
              )}
              {giphyImageUrl && showGiphyImage && (
                <GiphyContainer>
                  <CloseButtonContainer>
                    <Button
                      onClick={toggleShowGiphyImage}
                      aria-label="Hide Giphy Image"
                      tabIndex={-1}
                    >
                      <Close />
                    </Button>
                  </CloseButtonContainer>
                  <img src={giphyImageUrl} alt="Giphy" height="200px" />
                </GiphyContainer>
              )}
              {giphyImageUrl && !showGiphyImage && (
                <HiddenImageMessageContainer>
                  <Typography
                    onClick={toggleShowGiphyImage}
                    variant="caption"
                    style={{ cursor: 'pointer' }}
                  >
                    (hidden image, click to display)
                  </Typography>
                </HiddenImageMessageContainer>
              )}
            </CardContent>
            {displayAction && canCreateAction && (
              <CardContent className={classes.actionContainer}>
                <Typography variant="caption">{translations.title}:</Typography>
                <Typography variant="body1">
                  <EditableLabel
                    value={post.action || ''}
                    onChange={onEditAction}
                    label={translations.title}
                    focused={actionsToggled && !post.action}
                    multiline
                  />
                </Typography>
              </CardContent>
            )}
            <CardActions style={{ backgroundColor: color }}>
              <VoteButton
                voters={upVoters}
                canVote={canUpVote}
                count={upVotes}
                icon={<ThumbUpOutlined style={{ color: Palette.positive }} />}
                onClick={onLike}
                showTooltip={canShowAuthor}
                ariaLabel="Like"
              />
              <VoteButton
                voters={downVoters}
                canVote={canDownVote}
                count={downVotes}
                icon={<ThumbDownOutlined style={{ color: Palette.negative }} />}
                onClick={onDislike}
                showTooltip={canShowAuthor}
                ariaLabel="Dislike"
              />
              {canDelete && (
                <Button onClick={onDelete} aria-label="Delete" tabIndex={-1}>
                  <DeleteForeverOutlined style={{ color: Palette.negative }} />
                </Button>
              )}
              {canCreateAction && (
                <Button
                  onClick={toggleAction}
                  aria-label={translations.label}
                  title={translations.tooltip}
                  disabled={!!post.action}
                  tabIndex={-1}
                >
                  {post.action ? (
                    <Feedback className={classes.actionIcon} />
                  ) : (
                    <FeedbackOutlined className={classes.actionIcon} />
                  )}
                </Button>
              )}
              {canEdit && config.hasGiphy && (
                <Button
                  onClick={handleShowGiphy}
                  aria-label="Ghipfy"
                  tabIndex={-1}
                  ref={postElement}
                >
                  <EmojiEmotions className={classes.ghipyIcon} />
                </Button>
              )}
            </CardActions>
          </PostCard>
        )}
      </Draggable>
      <Popover
        open={showGiphyEditor}
        anchorEl={postElement.current}
        onClose={handleHideGiphyEditor}
        onEscapeKeyDown={handleHideGiphyEditor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Card>
          <CardContent>
            <GiphySearchBox
              apiKey={config.GiphyApiKey}
              onSelect={handleChooseGiphyEditor}
            />
          </CardContent>
        </Card>
      </Popover>
    </>
  );
};

const DragHandle = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
  visibility: hidden;
  color: grey;
`;

const PostCard = styled(Card)`
  margin: 10px 5px;
  margin-bottom: 20px;
  position: relative;

  :hover {
    ${DragHandle} {
      visibility: visible;
    }
  }
`;

const AuthorContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  margin-top: -10px;
  top: 10px;
  right: -5px;
`;

const GiphyContainer = styled.div`
  position: relative;
  img {
    width: 100%;
    object-fit: fit;
    height: 100%;
  }

  margin: -20px;
  margin-top: 30px;
`;

const CloseButtonContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

const HiddenImageMessageContainer = styled.div`
  margin: -20px;
  margin-top: 30px;
  padding: 10px;
  background: #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default PostItem;
