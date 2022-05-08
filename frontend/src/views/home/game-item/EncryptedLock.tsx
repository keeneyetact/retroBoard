import { colors } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { Lock, LockOpenOutlined, LockOutlined } from '@mui/icons-material';
import { SessionMetadata } from 'common';
import { CHECK_PREFIX, decrypt } from '../../../crypto/crypto';
import { useEncryptionKey } from '../../../crypto/useEncryptionKey';
import ProButton from '../../../components/ProButton';
import { useTranslation } from 'react-i18next';

interface EncryptedLockProps {
  session: SessionMetadata;
}

function EncryptedLock({ session }: EncryptedLockProps) {
  const [key] = useEncryptionKey(session.id);
  const { t } = useTranslation();

  if (!session.encrypted) {
    return (
      <ProButton>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={t('Encryption.sessionNotEncrypted')!}>
            <LockOpenOutlined htmlColor={colors.grey[400]} />
          </Tooltip>
        </div>
      </ProButton>
    );
  }

  if (!key) {
    return (
      <Tooltip title={t('Encryption.sessionEncryptedNoKeyTooltip')!}>
        <Lock color="error" />
      </Tooltip>
    );
  }

  if (decrypt(session.encrypted, key) !== CHECK_PREFIX) {
    return (
      <Tooltip title={t('Encryption.sessionEncryptedWrongKeyTooltip')!}>
        <Lock color="error" />
      </Tooltip>
    );
  }

  return (
    <Tooltip title={t('Encryption.sessionEncryptedHaveKeyTooltip')!}>
      <LockOutlined htmlColor={colors.green[500]} />
    </Tooltip>
  );
}

export default EncryptedLock;
