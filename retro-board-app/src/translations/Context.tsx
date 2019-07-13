import React from 'react';

const LanguageContext = React.createContext({
  language: 'en',
  setLanguage: (_: string) => {},
});

export default LanguageContext;
