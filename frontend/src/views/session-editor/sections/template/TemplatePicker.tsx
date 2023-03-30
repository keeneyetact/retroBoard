import {
  ColumnSettings,
  Template,
  TranslationFunction,
} from '../../../../state/types';
import {
  getAllTemplates,
  getTemplateColumns,
} from '../../../../state/templates';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { TemplateItem } from './TemplateItem';

interface TemplatePickerProps {
  current: ColumnSettings[];
  onSelect: (value: Template) => void;
}

export function TemplatePicker({ current, onSelect }: TemplatePickerProps) {
  const { t } = useTranslation();
  const templates = getAllTemplates(t);

  return (
    <Container>
      {templates
        .filter((def) => def.type !== 'default')
        .map((def) => (
          <TemplateItem
            key={def.type}
            definition={def}
            selected={isSelected(current, def.type, t)}
            onSelect={onSelect}
          />
        ))}
    </Container>
  );
}

function isSelected(
  current: ColumnSettings[],
  templateType: Template,
  t: TranslationFunction
) {
  const template = getTemplateColumns(templateType, t);
  if (current.length !== template.length) {
    return false;
  }
  for (let i = 0; i < current.length; i++) {
    if (
      current[i].type !== template[i].type ||
      current[i].color !== template[i].color ||
      current[i].icon !== template[i].icon
    ) {
      return false;
    }
  }
  return true;
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 0;
`;
