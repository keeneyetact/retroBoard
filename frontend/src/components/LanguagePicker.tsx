import { useCallback } from 'react';
import styled from '@emotion/styled';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { languages } from '../translations';
import { Flag } from './Flag';

interface LanguagePickerProps {
  value: string;
  variant?: 'outlined' | 'standard' | 'filled';
  small?: boolean;
  onChange: (value: string) => void;
}

const LanguagePicker = ({
  value,
  variant = 'standard',
  small,
  onChange,
}: LanguagePickerProps) => {
  const handleSelect = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      const language = event.target.value as string;
      onChange(language);
    },
    [onChange]
  );
  return (
    <StyledSelect
      value={value}
      onChange={handleSelect}
      variant={variant}
      small={small}
      size={small ? 'small' : 'medium'}
      disableUnderline={small}
      data-cy="language-picker"
    >
      {languages.map((language) => (
        <MenuItem
          value={language.locale}
          key={language.locale}
          data-cy={`language-picker-item-${language.locale}`}
        >
          <LanguageItem>
            <Flag country={language.iso} />
            {!small ? (
              <Names>
                <Name>{language.name}</Name>
                <EnglishName>{language.englishName}</EnglishName>
              </Names>
            ) : null}
          </LanguageItem>
        </MenuItem>
      ))}
    </StyledSelect>
  );
};

const StyledSelect = styled(Select)<{ small?: boolean }>`
  width: ${(props) => (props.small ? '100px' : '250px;')};
`;

const LanguageItem = styled.div`
  display: flex;
  align-items: center;
`;

const Names = styled.div`
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  font-size: 0.8em;
`;

const Name = styled.div``;

const EnglishName = styled.div`
  color: grey;
`;

export default LanguagePicker;
