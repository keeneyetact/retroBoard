import useUser from 'state/user/useUser';
import EditableLabel from 'components/EditableLabel';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { updateUserName } from 'views/account/api';
import { useSetUser } from 'state/user/useSetUser';

export function NameEditor() {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const user = useUser();
  const setUser = useSetUser();
  const handleEditName = useCallback(
    async (name: string) => {
      const trimmed = name.trim();
      if (!trimmed.length) {
        enqueueSnackbar(t('AccountPage.noEmptyNameError'), {
          variant: 'warning',
        });
      } else {
        const updatedUser = await updateUserName(name);
        setUser(updatedUser);
      }
    },
    [setUser, enqueueSnackbar, t]
  );

  if (!user) {
    return <>Stranger</>;
  }

  return <EditableLabel value={user.name} onChange={handleEditName} />;
}
