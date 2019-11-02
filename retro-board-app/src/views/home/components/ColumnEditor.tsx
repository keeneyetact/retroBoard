import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import EditableLabel from '../../../components/EditableLabel';
import { ColumnSettings } from '../../../state/types';
import { IconName } from 'retro-board-common';
import { TwitterPicker, ColorResult } from 'react-color';
import IconPicker from './IconPicker';

interface ColumnEditorProps {
  value: ColumnSettings;
  defaults: ColumnSettings;
  onChange: (value: ColumnSettings) => void;
}

const ColumnEditor = ({ value, defaults, onChange }: ColumnEditorProps) => {
  const [pickerOpen, setPickerOpen] = useState(false);
  const openPicker = useCallback(() => setPickerOpen(true), []);
  const closePicker = useCallback(() => setPickerOpen(false), []);
  const handleLabelChange = useCallback(
    (label: string) => {
      onChange({
        ...value,
        label,
      });
    },
    [onChange, value]
  );
  const handleColorChange = useCallback(
    (result: ColorResult) => {
      onChange({
        ...value,
        color: result.hex,
      });
      closePicker();
    },
    [onChange, value, closePicker]
  );

  const handleIconChange = useCallback(
    (icon: IconName) => {
      onChange({
        ...value,
        icon,
      });
    },
    [onChange, value]
  );
  return (
    <Container>
      <ColorAndIconContainer>
        <ColorContainer>
          <ColorPickerValue
            color={value.color || defaults.color}
            onClick={pickerOpen ? closePicker : openPicker}
          />
          {pickerOpen && (
            <ClickAwayListener onClickAway={closePicker}>
              <PickerContainer>
                <TwitterPicker
                  colors={[
                    '#E8F5E9',
                    '#FFEBEE',
                    '#FFFDE7',
                    '#BBDEFB',
                    '#E1BEE7',
                    '#FFE0B2',
                    '#FFCCBC',
                    '#B2EBF2',
                    '#D7CCC8',
                    '#CFD8DC',
                  ]}
                  triangle="hide"
                  color={value.color || defaults.color}
                  onChange={handleColorChange}
                ></TwitterPicker>
              </PickerContainer>
            </ClickAwayListener>
          )}
        </ColorContainer>
        <IconContainer>
          <IconPicker
            value={value.icon}
            defaultValue={defaults.icon!}
            onChange={handleIconChange}
          />
        </IconContainer>
      </ColorAndIconContainer>
      <Typography>
        <EditableLabel
          value={value.label}
          onChange={handleLabelChange}
          placeholder={defaults.label}
        />
      </Typography>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ColorPickerValue = styled.div<{ color: string }>`
  width: 24px;
  height: 24px;
  border-radius: 10px;
  border: 1px solid grey;
  background-color: ${props => props.color};
  cursor: pointer;
`;

const PickerContainer = styled.div`
  position: absolute;
  left: 0px;
  top: -100px;
  z-index: 9999;
`;

const ColorContainer = styled.div`
  position: relative;
  margin-right: 20px;
`;

const IconContainer = styled.div`
  margin-right: 20px;
`;

const ColorAndIconContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    margin-bottom: 15px;
  }
`;

export default ColumnEditor;
