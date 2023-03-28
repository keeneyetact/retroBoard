import UserContext from 'auth/Context';
import useUser from 'auth/useUser';
import EditableLabel from 'components/EditableLabel';
import { useSnackbar } from 'notistack';
import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { updateUserName } from 'views/account/api';

export function NameEditor() {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const user = useUser();
  const { setUser } = useContext(UserContext);
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
