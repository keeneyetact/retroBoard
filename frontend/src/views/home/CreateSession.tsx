import { useCallback, useMemo } from 'react';
import { SessionOptions, ColumnDefinition, defaultOptions } from 'common';
import { buildDefaults, toColumnDefinitions } from '../../state/columns';
import { ColumnSettings } from '../../state/types';
import { useTranslation } from 'react-i18next';
import { trackEvent } from './../../track';
import SessionEditor from '../session-editor/SessionEditor';

interface CreateSessionModalProps {
  open: boolean;
  onClose: () => void;
  onLaunch: (
    options: SessionOptions,
    columns: ColumnDefinition[],
    makeDefault: boolean
  ) => void;
}

const CreateSessionModal = ({
  open,
  onClose,
  onLaunch,
}: CreateSessionModalProps) => {
  const { t } = useTranslation();
  const defaultDefinitions = useMemo(() => {
    return buildDefaults('default', t);
  }, [t]);

  const handleChange = useCallback(
    (
      options: SessionOptions,
      columns: ColumnSettings[],
      makeDefault: boolean
    ) => {
      trackEvent('custom-modal/create');
      if (makeDefault) {
        trackEvent('custom-modal/template/set-defaut');
      }
      onLaunch(options, toColumnDefinitions(columns), makeDefault);
    },
    [onLaunch]
  );

  return (
    <SessionEditor
      columns={defaultDefinitions}
      options={defaultOptions}
      onChange={handleChange}
      open={open}
      onClose={onClose}
    />
  );
};

export default CreateSessionModal;
