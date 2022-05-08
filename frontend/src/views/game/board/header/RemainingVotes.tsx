import styled from '@emotion/styled';
import { Palette } from '../../../../Theme';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import { ThumbUpOutlined, ThumbDownOutlined } from '@mui/icons-material';
import useSession from '../../useSession';
import { useTranslation } from 'react-i18next';
import { TranslationFunction } from 'state/types';

interface RemainingVotesProps {
  up: number | null;
  down: number | null;
}

const RemainingVotes = ({ up, down }: RemainingVotesProps) => {
  const { t } = useTranslation();
  const { session } = useSession();
  const hideUpVotes = session?.options.maxUpVotes === 0;
  const hideDownVotes = session?.options.maxDownVotes === 0;
  if (up === null && down === null && hideUpVotes && hideDownVotes) {
    return <div />;
  }

  return (
    <Container>
      {up !== null && !hideUpVotes ? (
        <Tooltip placement="bottom" title={getTooltip(t, up, 'up')}>
          <Badge
            badgeContent={up.toString()}
            color={up > 0 ? 'primary' : 'error'}
          >
            <ThumbUpOutlined style={{ color: Palette.positive }} />
          </Badge>
        </Tooltip>
      ) : null}
      {down !== null && !hideDownVotes ? (
        <Tooltip placement="bottom" title={getTooltip(t, down, 'down')}>
          <Badge
            badgeContent={down.toString()}
            color={down > 0 ? 'primary' : 'error'}
          >
            <ThumbDownOutlined style={{ color: Palette.negative }} />
          </Badge>
        </Tooltip>
      ) : null}
    </Container>
  );
};

function getTooltip(
  t: TranslationFunction,
  value: number,
  type: 'up' | 'down'
) {
  if (value === 0) {
    return t('Post.voteRemainingNone', {
      type: type === 'up' ? t('Post.upVote') : t('Post.downVote'),
    });
  }
  if (value === 1) {
    return t('Post.voteRemainingOne', {
      type: type === 'up' ? t('Post.upVote') : t('Post.downVote'),
    });
  }
  return t('Post.voteRemainingMultiple', {
    number: value,
    type: type === 'up' ? t('Post.upVote') : t('Post.downVote'),
  });
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  > * {
    margin-right: 20px;
  }
  @media (max-width: 500px) {
    padding-bottom: 10px;
  }
`;

export default RemainingVotes;
