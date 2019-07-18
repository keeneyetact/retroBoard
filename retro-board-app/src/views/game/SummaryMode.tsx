import React, { useMemo } from 'react';
import styled from 'styled-components';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid,
} from '@material-ui/core';
import { ColumnContent } from './types';
import { Palette } from '../../Theme';
import { Post } from 'retro-board-common';

interface SummaryModeProps {
  columns: ColumnContent[];
}

interface SectionProps {
  column: ColumnContent;
}

const Section = ({ column }: SectionProps) => (
  <Grid container spacing={4} component="section" role="list">
    <Grid item xs={12}>
      <Card>
        <CardHeader
          title={column.label}
          style={{ backgroundColor: column.color }}
        />
        <CardContent>
          <PostsList posts={column.posts} />
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

interface PostsListProps {
  posts: Post[];
}

function sortFunction(a: Post, b: Post): number {
  const scoreA = a.likes.length - a.dislikes.length;
  const scoreB = b.likes.length - b.dislikes.length;
  if (scoreA === scoreB) {
    return 0;
  }

  return scoreA < scoreB ? 1 : -1;
}

const PostsList = ({ posts }: PostsListProps) => {
  const sortedList = useMemo(() => {
    return posts.sort(sortFunction);
  }, [posts]);
  return (
    <>
      {sortedList.map(post => (
        <PostLine post={post} key={post.id} />
      ))}
    </>
  );
};

interface PostLineProps {
  post: Post;
}

const PostLine = ({ post }: PostLineProps) => (
  <PostContainer role="listitem">
    <Typography>
      <PositiveNumber>+{post.likes.length}</PositiveNumber>&nbsp;
      <NegativeNumber>-{post.dislikes.length}</NegativeNumber>
      &nbsp;<span aria-label="post content">{post.content}</span>
    </Typography>
  </PostContainer>
);

const PositiveNumber = styled.span`
  color: ${Palette.positive};
`;

const NegativeNumber = styled.span`
  color: ${Palette.negative};
`;

const SummaryMode: React.SFC<SummaryModeProps> = ({ columns }) => (
  <div>
    <div>
      {columns.map(column => (
        <Section key={column.type} column={column} />
      ))}
    </div>
  </div>
);

const PostContainer = styled.div``;

export default SummaryMode;
