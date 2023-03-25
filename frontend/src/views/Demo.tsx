import styled from '@emotion/styled';
import { colors } from '@mui/material';
import { createDemoGame, me, updateLanguage } from 'api';
import UserContext from 'auth/Context';
import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { trackEvent } from 'track';
import { Language } from 'translations/languages';
import { languages, useLanguage } from '../translations';

export default function Demo() {
  const { setUser } = useContext(UserContext);
  let [searchParams] = useSearchParams();
  const twoLetter = searchParams.get('lang');
  const [currentLanguage, changeLanguage] = useLanguage();
  const language = getLanguage(twoLetter || 'en');

  useEffect(() => {
    if (currentLanguage.locale !== language.locale) {
      changeLanguage(language.locale);
    }
  }, [language.locale, currentLanguage.locale, changeLanguage]);

  useEffect(() => {
    async function fetch() {
      trackEvent('register/demo');
      let updatedUser = await me();
      if (updatedUser?.language === null) {
        updatedUser = await updateLanguage(language.locale);
      }
      setUser(updatedUser);
      changeLanguage(language.locale);
      const session = await createDemoGame();
      if (session) {
        window.location.href = `/game/${session.id}`;
      }
    }
    if (language.locale === currentLanguage.locale) {
      fetch();
    }
  }, [language.locale, currentLanguage.locale, setUser, changeLanguage]);
  return (
    <Container>
      <h1>Preparing demo...</h1>
    </Container>
  );
}

function getLanguage(twoLetter: string): Language {
  return languages.find((l) => l.twoLetter === twoLetter) || languages[0];
}

const Container = styled.div`
  background-color: ${colors.deepPurple[400]};
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 60px);

  h1 {
    color: white;
    font-size: 3rem;
  }
`;
