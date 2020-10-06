import React from 'react';
import config from '../utils/getConfig';

const LanguageContext = React.createContext({
  language: config.defaultLanguage,
  setLanguage: (_: string) => {},
});

export default LanguageContext;
