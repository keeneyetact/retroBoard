import React, { useCallback } from 'react';
import Switch from '@material-ui/core/Switch';

interface BooleanOptionProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const BooleanOption = ({ value, onChange }: BooleanOptionProps) => {
  const handleChange = useCallback(
    (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
      onChange(checked),
    [onChange]
  );
  return <Switch checked={value} onChange={handleChange}></Switch>;
};

export default BooleanOption;
