import { useCallback } from 'react';
import { ColumnSettings } from '../../../../state/types';
import ColumnEditor from './ColumnEditor';
import { getTemplateColumnByType } from '../../../../state/columns';
import { trackEvent } from '../../../../track';
import { Add } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import styled from '@emotion/styled';

const MAX_NUMBER_OF_COLUMNS = 5;

type TemplateEditorProps = {
  columns: ColumnSettings[];
  onChange: (columns: ColumnSettings[]) => void;
};

export function TemplateEditor({ columns, onChange }: TemplateEditorProps) {
  const { t } = useTranslation();
  const handleColumnChange = useCallback(
    (value: ColumnSettings, index: number) => {
      onChange(Object.assign([], columns, { [index]: value }));
      trackEvent('custom-modal/column/change');
    },
    [onChange, columns]
  );
  const handleAddColumn = useCallback(() => {
    const custom = getTemplateColumnByType(t)('custom');
    onChange([...columns, custom]);
    trackEvent('custom-modal/column/add');
  }, [onChange, columns, t]);
  const handleRemoveColumn = useCallback(
    (column: ColumnSettings) => {
      onChange(columns.filter((c) => c !== column));
      trackEvent('custom-modal/column/remove');
    },
    [onChange, columns]
  );
  return (
    <Container>
      {columns.map((def, index) => (
        <ColumnEditor
          key={index}
          value={def}
          canDelete={columns.length > 1}
          onChange={(value) => handleColumnChange(value, index)}
          onRemove={handleRemoveColumn}
        />
      ))}
      {columns.length < MAX_NUMBER_OF_COLUMNS ? (
        <Button
          onClick={handleAddColumn}
          color="secondary"
          startIcon={<Add />}
          style={{ marginTop: 10 }}
        >
          {t('Customize.customTemplateAddColumn')}
        </Button>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  @media screen and (min-width: 600px) {
    min-height: 340px;
  }
`;
