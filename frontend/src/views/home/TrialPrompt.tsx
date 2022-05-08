import { Alert, AlertColor, AlertTitle } from '@mui/material';
import { differenceInDays } from 'date-fns';
import { Link } from 'react-router-dom';
import useIsTrial from '../../auth/useIsTrial';
import useUser from '../../auth/useUser';
import useFormatDate from '../../hooks/useFormatDate';
import { useTranslation } from 'react-i18next';
import useQuota from '../../hooks/useQuota';
import Button from '@mui/material/Button';
import ProButton from '../../components/ProButton';

export default function TrialPrompt() {
  const user = useUser();
  const isInTrial = useIsTrial();
  const formatDistanceToNow = useFormatDate();
  const { t } = useTranslation();
  const { quota } = useQuota();
  const quotaLeft = !!quota ? quota.quota - quota.posts : null;
  const overQuota = !!quota && quota.posts >= quota.quota;
  const nearQuota = !!quota && !overQuota && quota.posts >= quota.quota - 20;

  if (!user || user.pro) {
    return null;
  }

  if (user.trial && isInTrial) {
    const remainingDays = differenceInDays(new Date(user.trial), new Date());
    const color = getAlertType(remainingDays);

    return (
      <Alert severity={color}>
        <AlertTitle>{t('TrialPrompt.onTrialTitle')}</AlertTitle>
        {t('TrialPrompt.remainingTrialSentence', {
          remaining: formatDistanceToNow(new Date(user.trial)),
        })}
        &nbsp;
        <Link style={{ textDecoration: 'none' }} to="/subscribe">
          {t('TrialPrompt.subscribeNow')}
        </Link>
      </Alert>
    );
  }

  return (
    <>
      {user.trial && !isInTrial ? (
        <Alert severity="error">
          <AlertTitle>{t('TrialPrompt.trialEndedTitle')}</AlertTitle>
          {t('TrialPrompt.trialEndedSentence')}&nbsp;
          <Link style={{ textDecoration: 'none' }} to="/subscribe">
            {t('TrialPrompt.subscribeNow')}
          </Link>
        </Alert>
      ) : null}
      {overQuota ? (
        <Alert severity="error">
          <AlertTitle>{t('TrialPrompt.allowanceReachedTitle')}</AlertTitle>
          {t('TrialPrompt.allowanceReachedDescription')}
          <ProButton>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 10 }}
            >
              {t('TrialPrompt.subscribeNow')}
            </Button>
          </ProButton>
        </Alert>
      ) : null}
      {nearQuota ? (
        <Alert severity="warning">
          <AlertTitle>{t('TrialPrompt.nearEndAllowanceTitle')}</AlertTitle>
          {t('TrialPrompt.nearEndAllowanceDescription', { quota: quotaLeft })}
          <ProButton>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 10 }}
            >
              {t('TrialPrompt.subscribeNow')}
            </Button>
          </ProButton>
        </Alert>
      ) : null}
    </>
  );
}

function getAlertType(remainingDays: number): AlertColor {
  if (remainingDays < 0) {
    return 'error';
  }
  if (remainingDays < 5) {
    return 'warning';
  }

  return 'info';
}
