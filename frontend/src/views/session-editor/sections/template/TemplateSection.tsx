import { useCallback } from 'react';
import SettingCategory from '../SettingCategory';
import { TemplatePicker } from './TemplatePicker';
import { useTranslation } from 'react-i18next';
import { ColumnSettings, Template } from '../../../../state/types';
import { TemplateEditor } from './TemplateEditor';
import { buildDefaults } from '../../../../state/columns';
import { trackEvent } from '../../../../track';

interface TemplateSectionProps {
  columns: ColumnSettings[];
  onChange: (columns: ColumnSettings[]) => void;
}

function TemplateSection({ columns, onChange }: TemplateSectionProps) {
  const { t } = useTranslation();

  const handleTemplateChange = useCallback(
    (templateType: Template) => {
      const template = buildDefaults(templateType, t);
      onChange(template);
      trackEvent('custom-modal/template/select');
    },
    [t, onChange]
  );

  return (
    <SettingCategory
      title={t('Customize.customTemplateCategory')!}
      subtitle={t('Customize.customTemplateCategorySub')!}
    >
      <TemplatePicker current={columns} onSelect={handleTemplateChange} />
      <div style={{ height: 20 }} />
      <TemplateEditor columns={columns} onChange={onChange} />
    </SettingCategory>
  );
}

export default TemplateSection;
