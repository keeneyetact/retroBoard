import { colors } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { VerifiedUser, VerifiedUserOutlined } from '@mui/icons-material';
import { SessionMetadata } from 'common';
import ProButton from '../../../components/ProButton';
import { useTranslation } from 'react-i18next';

interface PrivateSessionIconProps {
  session: SessionMetadata;
}

function PrivateSessionIcon({ session }: PrivateSessionIconProps) {
  const { t } = useTranslation();

  if (!session.locked) {
    return (
      <ProButton>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={t('Private.sessionIsPublic')!}>
            <VerifiedUserOutlined htmlColor={colors.grey[400]} />
          </Tooltip>
        </div>
      </ProButton>
    );
  }

  if (!session.lockedForUser) {
    return (
      <Tooltip title={t('Private.sessionIsPrivate')!}>
        <VerifiedUser htmlColor={colors.green[500]} />
      </Tooltip>
    );
  }
  return (
    <Tooltip title={t('Private.sessionIsPrivateNoAccess')!}>
      <VerifiedUser htmlColor={colors.red[500]} />
    </Tooltip>
  );
}

export default PrivateSessionIcon;
