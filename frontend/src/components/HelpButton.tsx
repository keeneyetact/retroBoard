import { Help } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

type HelpButtonProps = {
  children: React.ReactNode;
  color?: string;
};

export function HelpButton({ children, color }: HelpButtonProps) {
  return (
    <Tooltip title={children}>
      <Help htmlColor={color} />
    </Tooltip>
  );
}
