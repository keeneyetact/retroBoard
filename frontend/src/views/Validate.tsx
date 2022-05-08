import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { verifyEmail } from '../api';
import { Alert } from '@mui/material';
import { useContext } from 'react';
import UserContext from '../auth/Context';
import { useTranslation } from 'react-i18next';

function ValidatePage() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const params = new URLSearchParams(location.search);
  const email = params.get('email');
  const code = params.get('code');

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function verify() {
      if (email && code) {
        const result = await verifyEmail(email, code);
        setLoading(false);
        setSuccess(!!result);
        if (result) {
          setTimeout(() => {
            setUser(result);
            navigate('/');
          }, 2000);
        }
      } else {
        setLoading(false);
        setSuccess(false);
      }
    }
    verify();
  }, [email, code, navigate, setUser]);

  return (
    <div style={{ margin: 50 }}>
      {success && !loading ? (
        <Alert severity="success">{t('ValidateAccount.success')}</Alert>
      ) : null}
      {!success && !loading ? (
        <Alert severity="error">{t('ValidateAccount.error')}</Alert>
      ) : null}
      {loading ? (
        <Alert severity="info">{t('ValidateAccount.loading')}</Alert>
      ) : null}
    </div>
  );
}

export default ValidatePage;
