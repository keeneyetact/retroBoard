import ClosableAlert from 'components/ClosableAlert';
import useUser from 'state/user/useUser';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function SetupProPrompt() {
  const user = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleAction = useCallback(() => {
    navigate('/account');
  }, [navigate]);

  const shouldDisplay =
    user &&
    user.pro &&
    user.plan === 'team' &&
    user.ownPlan &&
    user.planMembers?.length === 0;

  if (!shouldDisplay) {
    return null;
  }

  return (
    <ClosableAlert closable persisted id="setup-pro-prompt" severity="info">
      {t('Home.proNotSetupWarning')}&nbsp;
      <Button onClick={handleAction}>
        {t('Home.proNotSetupWarningAction')}
      </Button>
    </ClosableAlert>
  );
}
