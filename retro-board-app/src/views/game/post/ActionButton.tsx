import React from 'react';
import { Tooltip, Button } from '@material-ui/core';

interface ActionButtonProps {
  tooltip?: React.ReactNode | null;
  ariaLabel: string;
  icon: JSX.Element;
  disabled?: boolean;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  tooltip,
  icon,
  onClick,
  ariaLabel,
  disabled,
  children,
}) => {
  const showTooltip = !!tooltip;
  return (
    <Tooltip
      placement="bottom"
      disableHoverListener={!showTooltip}
      disableFocusListener={!showTooltip}
      disableTouchListener={!showTooltip}
      title={tooltip}
    >
      <span>
        <Button
          onClick={onClick}
          disabled={!!disabled}
          aria-label={ariaLabel}
          tabIndex={-1}
        >
          {icon}
          {children !== undefined ? <>&nbsp;{children}</> : null}
        </Button>
      </span>
    </Tooltip>
  );
};

export default ActionButton;
