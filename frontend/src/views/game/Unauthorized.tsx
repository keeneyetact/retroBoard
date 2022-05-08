import { AccessErrorType } from 'common';
import NoContent from '../../components/NoContent';
import { useTranslation } from 'react-i18next';

interface UnauthorizedProps {
  reason?: AccessErrorType;
}

function Unauthorized({ reason }: UnauthorizedProps) {
  const error = useGetErrors(reason);
  return <NoContent title={error.title} subtitle={error.subtitle} />;
}

interface Errors {
  title: string;
  subtitle: string;
}

function useGetErrors(reason?: AccessErrorType): Errors {
  const { t } = useTranslation();
  switch (reason) {
    case 'locked':
      return {
        title: t('Private.sessionLockedTitle')!,
        subtitle: t('Private.sessionLockedDescription')!,
      };
    case 'non_pro':
      return {
        title: t('Private.sessionNonProTitle')!,
        subtitle: t('Private.sessionNonProDescription')!,
      };
  }

  return {
    title: 'Unknown Error',
    subtitle:
      'This session is unavailable to you, because of an unknown error.',
  };
}

export default Unauthorized;
