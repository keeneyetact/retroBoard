import React, { useCallback } from 'react';
import styled from 'styled-components';
import Slider, { Mark } from '@material-ui/core/Slider';

interface MaxVoteSliderProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

const UNLIMITED = 6; // Arbitrary value, translated to null anyway

const marks: Mark[] = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: UNLIMITED, label: 'Unlimited' },
];

const MaxVoteSlider = ({ value, onChange }: MaxVoteSliderProps) => {
  const handleChange = useCallback(
    (_event: React.ChangeEvent<{}>, value: number | number[]) =>
      onChange(value === UNLIMITED ? null : (value as number)),
    [onChange]
  );
  return (
    <Container>
      <Slider
        value={value === null ? UNLIMITED : (value as number)}
        onChange={handleChange}
        marks={marks}
        min={1}
        max={UNLIMITED}
      />
    </Container>
  );
};

const Container = styled.div`
  padding-right: 20px;
`;

export default MaxVoteSlider;
