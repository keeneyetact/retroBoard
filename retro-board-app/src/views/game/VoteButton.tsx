import React from 'react';
import { Tooltip, Button } from '@material-ui/core';
import { VoteEnumeration } from './utils';

interface VoteButtonProps {
  voters: VoteEnumeration[];
  showTooltip: boolean;
  canVote: boolean;
  count: number;
  icon: JSX.Element;
  ariaLabel: string;
  onClick: () => void;
}

const VoteButton = ({
  voters,
  showTooltip,
  canVote,
  count,
  icon,
  onClick,
  ariaLabel,
}: VoteButtonProps) => {
  const show = showTooltip && voters.length;
  return (
    <Tooltip
      placement="bottom"
      disableHoverListener={!show}
      disableFocusListener={!show}
      disableTouchListener={!show}
      title={
        show ? (
          <div>
            {voters.map((voter, i) => (
              <p key={i}>
                {voter.name}
                {voter.count > 1 ? ` (x${voter.count})` : ''}
              </p>
            ))}
          </div>
        ) : (
          ''
        )
      }
    >
      <span>
        <Button
          onClick={onClick}
          disabled={!canVote}
          aria-label={ariaLabel}
          tabIndex={-1}
        >
          {icon}
          &nbsp;{count}
        </Button>
      </span>
    </Tooltip>
  );
};

export default VoteButton;
