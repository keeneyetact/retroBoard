import React, { useCallback } from 'react';
import { getIcon, getAllIcons } from '../../../state/icons';
import { IconName } from 'retro-board-common';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

interface IconPickerProps {
  value: IconName | null;
  defaultValue: IconName;
  onChange: (value: IconName) => void;
}

const IconPicker = ({ value, defaultValue, onChange }: IconPickerProps) => {
  const icons = getAllIcons();
  const handleChange = useCallback(
    (
      event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
      }>
    ) => {
      onChange(event.target.value as IconName);
    },
    [onChange]
  );
  const actualValue: IconName = value || defaultValue;
  return (
    <Select
      value={actualValue}
      renderValue={renderIcon}
      onChange={handleChange}
    >
      {icons.map(icon => {
        const AnIcon = getIcon(icon)!;
        return (
          <MenuItem value={icon} key={icon}>
            <AnIcon />
          </MenuItem>
        );
      })}
    </Select>
  );
};

function renderIcon(icon: unknown): React.ReactNode {
  const Icon = getIcon(icon as IconName);
  return Icon ? <Icon /> : null;
}

export default IconPicker;
