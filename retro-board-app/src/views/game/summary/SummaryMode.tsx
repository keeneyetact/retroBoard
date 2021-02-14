import { useMemo } from 'react';
import styled from 'styled-components';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid,
  useTheme,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  colors,
} from '@material-ui/core';
import { Feedback } from '@material-ui/icons';
import { ColumnContent } from '../types';
import { Palette } from '../../../Theme';
import useTranslations from '../../../translations';
import { Page } from '../../../components/Page';
import SpeedDial from './SpeedDial';
import { calculateSummary } from './calculate-summary';
import { ColumnStats, ColumnStatsItem, ActionItem } from './types';
import useTranslation from '../../../translations';
import useCrypto from '../../../crypto/useCrypto';
import isFaded from '../isFaded';

interface SummaryModeProps {
  columns: ColumnContent[];
  search: string;
}

interface SectionProps {
  stats: ColumnStats;
  search: string;
}

const Section = ({ stats, search }: SectionProps) => {
  const { SummaryBoard: translations } = useTranslation();
  return (
    <Grid container spacing={4} component="section" role="list">
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <Typography variant="h6" style={{ fontWeight: 300 }}>
                {stats.column.label}
              </Typography>
            }
            style={{ backgroundColor: stats.column.color }}
          />
          <CardContent>
            {stats.items.length ? (
              <PostsList items={stats.items} search={search} />
            ) : (
              <Typography variant="body1">{translations.noPosts}</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

interface GroupSummaryProps {
  group: ColumnStatsItem;
  search: string;
}

const GroupSummary = ({ group, search }: GroupSummaryProps) => {
  const { decrypt } = useCrypto();
  return (
    <GroupContainer>
      <GroupTitle>
        <Score>
          <PositiveNumber>+{group.likes}</PositiveNumber>&nbsp;
          <NegativeNumber>-{group.dislikes}</NegativeNumber>
        </Score>
        {decrypt(group.content)}
      </GroupTitle>
      <PostsList items={group.children} search={search} />
    </GroupContainer>
  );
};

const GroupContainer = styled.div`
  border-left: 1px dashed ${colors.grey[500]};
  margin-left: -10px;
  padding-left: 10px;
  > :nth-child(2) {
    margin-left: 15px;
  }
`;
const GroupTitle = styled.div`
  display: flex;
  font-weight: bold;
  opacity: 0.4;
`;

interface PostsListProps {
  items: ColumnStatsItem[];
  search: string;
}

const PostsList = ({ items, search }: PostsListProps) => {
  return (
    <div>
      {items.map((item) =>
        item.type === 'post' ? (
          <PostLine item={item} key={item.id} search={search} />
        ) : (
          <GroupSummary group={item} key={item.id} search={search} />
        )
      )}
    </div>
  );
};

interface PostLineProps {
  item: ColumnStatsItem;
  search: string;
}

const PostLine = ({ item, search }: PostLineProps) => {
  const { decrypt } = useCrypto();
  const higlighted = search && !isFaded(item.content, search, false);
  return (
    <Typography component="div">
      <PostContainer role="listitem">
        <Score>
          <PositiveNumber>+{item.likes}</PositiveNumber>&nbsp;
          <NegativeNumber>-{item.dislikes}</NegativeNumber>
        </Score>
        <PostContent
          aria-label="post content"
          style={{ fontWeight: higlighted ? 'bold' : 'normal' }}
        >
          {decrypt(item.content)}
        </PostContent>
      </PostContainer>
    </Typography>
  );
};

const PostContainer = styled.div`
  display: flex;
`;

const Score = styled.div`
  margin-right: 10px;
`;

const PositiveNumber = styled.span`
  color: ${Palette.positive};
`;

const NegativeNumber = styled.span`
  color: ${Palette.negative};
`;

const PostContent = styled.span`
  white-space: pre-wrap;
  flex: 1;
`;

interface ActionsListProps {
  actions: ActionItem[];
}

const ActionsList = ({ actions }: ActionsListProps) => {
  const theme = useTheme();
  const {
    Actions: { summaryTitle },
  } = useTranslations();
  const { decrypt } = useCrypto();
  return (
    <Grid
      container
      spacing={4}
      component="section"
      role="list"
      style={{ marginTop: 30 }}
    >
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <Typography variant="h6" style={{ fontWeight: 300 }}>
                {summaryTitle}
              </Typography>
            }
            style={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
          />
          <CardContent>
            <List>
              {actions.map((action) => (
                <ListItem key={action.postId}>
                  <ListItemIcon>
                    <Avatar>
                      <Feedback />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={decrypt(action.action)}
                    secondary={decrypt(action.postContent)}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

const SummaryMode = ({ columns, search }: SummaryModeProps) => {
  const stats = useMemo(() => {
    return calculateSummary(columns);
  }, [columns]);
  return (
    <Page>
      <div>
        {stats.columns.map((stat) => (
          <Section key={stat.column.index} stats={stat} search={search} />
        ))}
        {stats.actions.length ? <ActionsList actions={stats.actions} /> : null}
      </div>
      <SpeedDialContainer>
        <SpeedDial />
      </SpeedDialContainer>
    </Page>
  );
};

const SpeedDialContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1;
`;

export default SummaryMode;
