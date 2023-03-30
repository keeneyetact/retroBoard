import { useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import SessionEditor from '../../../session-editor/SessionEditor';
import { ColumnSettings } from '../../../../state/types';
import { SessionOptions, ColumnDefinition } from 'common';
import { toColumnDefinitions } from '../../../../state/columns';
import { trackEvent } from '../../../../track';
import { Settings } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import useSession from '../../useSession';
import { IconButton, useMediaQuery } from '@mui/material';

interface ModifyOptionsProps {
  onEditOptions: (options: SessionOptions) => void;
  onEditColumns: (columns: ColumnDefinition[]) => void;
  onSaveTemplate: (
    options: SessionOptions,
    columns: ColumnDefinition[]
  ) => void;
}

function ModifyOptions({
  onEditOptions,
  onEditColumns,
  onSaveTemplate,
}: ModifyOptionsProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { session } = useSession();
  const small = useMediaQuery('(max-width: 500px)');

  const handleChange = useCallback(
    (
      updatedOptions: SessionOptions,
      updatedColumns: ColumnSettings[],
      saveAsTemplate: boolean
    ) => {
      setOpen(false);
      if (!session) {
        return;
      }
      const { options, columns } = session;
      if (options !== updatedOptions) {
        onEditOptions(updatedOptions);
        trackEvent('game/session/edit-options');
      }
      if (columns !== updatedColumns) {
        onEditColumns(toColumnDefinitions(updatedColumns));
        trackEvent('game/session/edit-columns');
      }
      if (saveAsTemplate) {
        onSaveTemplate(updatedOptions, toColumnDefinitions(updatedColumns));
        trackEvent('custom-modal/template/set-defaut');
      }
    },
    [onEditOptions, onEditColumns, onSaveTemplate, session]
  );

  if (!session) {
    return null;
  }

  const { options, columns } = session;

  return (
    <>
      {small ? (
        <IconButton onClick={() => setOpen(true)} color="primary">
          <Settings />
        </IconButton>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Settings />}
          onClick={() => setOpen(true)}
        >
          {t('Join.standardTab.customizeButton')}
        </Button>
      )}
      {open ? (
        <SessionEditor
          edit
          open={open}
          columns={columns}
          options={options}
          onClose={() => setOpen(false)}
          onChange={handleChange}
        />
      ) : null}
    </>
  );
}

export default ModifyOptions;
