import React, { useCallback } from 'react';
import styled from 'styled-components';
import {
  Post,
  PostGroup,
  SessionOptions,
  ColumnDefinition,
} from '@retrospected/common';
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';
import useGlobalState from '../../../state';
import { getIcon } from '../../../state/icons';
import Column from './Column';
import { Page } from '../../../components/Page';
import { ColumnContent } from '../types';
import {
  getMovingEntities,
  getCombiningEntities,
  calculateRank,
} from './moving-logic';
import { getNext, getMiddle } from '../lexorank';
import BoardHeader from './header/BoardHeader';

interface GameModeProps {
  columns: ColumnContent[];
  options: SessionOptions;
  onRenameSession: (name: string) => void;
  onAddPost: (columnIndex: number, content: string, rank: string) => void;
  onAddGroup: (columnIndex: number, rank: string) => void;
  onMovePost: (
    post: Post,
    destinationGroup: PostGroup | null,
    destinationColumn: number,
    newRank: string
  ) => void;
  onCombinePost: (post1: Post, post2: Post) => void;
  onDeletePost: (post: Post) => void;
  onLike: (post: Post, like: boolean) => void;
  onEdit: (post: Post) => void;
  onEditGroup: (group: PostGroup) => void;
  onDeleteGroup: (group: PostGroup) => void;
  onEditOptions: (options: SessionOptions) => void;
  onEditColumns: (columns: ColumnDefinition[]) => void;
  onSaveTemplate: (
    options: SessionOptions,
    columns: ColumnDefinition[]
  ) => void;
  onLockSession: (locked: boolean) => void;
}

const calculateRankForNewPost = (column: ColumnContent): string => {
  if (column.posts.length) {
    return getNext(column.posts[column.posts.length - 1].rank);
  }
  return getMiddle();
};

const calculateRankForNewGroup = (column: ColumnContent): string => {
  if (column.groups.length) {
    return getNext(column.groups[column.groups.length - 1].rank);
  }
  return getMiddle();
};

function GameMode({
  onRenameSession,
  onAddPost,
  onAddGroup,
  onMovePost,
  onCombinePost,
  onDeletePost,
  onLike,
  onEdit,
  onEditGroup,
  onDeleteGroup,
  onEditOptions,
  onEditColumns,
  onSaveTemplate,
  onLockSession,
  columns,
  options,
}: GameModeProps) {
  const { state } = useGlobalState();

  const handleOnDragEnd = useCallback(
    (result: DropResult, _provided: ResponderProvided) => {
      if (!!result.destination) {
        const entities = getMovingEntities(
          result.draggableId,
          result.destination.droppableId,
          result.destination.index,
          columns
        );
        if (entities) {
          const newRank = calculateRank(entities.previous, entities.next);
          onMovePost(
            entities.post,
            entities.targetGroup,
            entities.targetColumn,
            newRank
          );
        }
      }
      if (!!result.combine) {
        const entities = getCombiningEntities(
          result.draggableId,
          result.combine.draggableId,
          columns
        );
        if (entities) {
          onCombinePost(entities.post1, entities.post2);
        }
      }
    },
    [onMovePost, onCombinePost, columns]
  );

  if (!state.session) {
    return <span>Loading...</span>;
  }

  return (
    <Page>
      <BoardHeader
        onEditColumns={onEditColumns}
        onEditOptions={onEditOptions}
        onSaveTemplate={onSaveTemplate}
        onLockSession={onLockSession}
        onRenameSession={onRenameSession}
      />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Columns numberOfColumns={columns.length}>
          {columns.map((column) => (
            <Column
              column={column}
              options={options}
              key={column.index}
              posts={column.posts}
              groups={column.groups}
              question={column.label}
              icon={getIcon(column.icon)}
              color={column.color}
              onAdd={(content) =>
                onAddPost(
                  column.index,
                  content,
                  calculateRankForNewPost(column)
                )
              }
              onAddGroup={() =>
                onAddGroup(column.index, calculateRankForNewGroup(column))
              }
              onDelete={onDeletePost}
              onLike={(post) => onLike(post, true)}
              onDislike={(post) => onLike(post, false)}
              onEdit={onEdit}
              onEditGroup={onEditGroup}
              onDeleteGroup={onDeleteGroup}
            />
          ))}
        </Columns>
      </DragDropContext>
    </Page>
  );
}

const Columns = styled.div<{ numberOfColumns: number }>`
  display: flex;
  margin-top: 30px;

  @media screen and (max-width: ${(props) =>
      props.numberOfColumns * 320 + 100}px) {
    margin-top: 10px;
    flex-direction: column;

    > * {
      margin-bottom: 20px;
    }
  }
`;

export default GameMode;
