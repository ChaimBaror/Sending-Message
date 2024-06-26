import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';
import translationHe from './locales/he/translation.json';

// the translations
const resources = {
  en: { translation: translationEN },
  es: { translation: translationES },
  he: { translation: translationHe },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    load: 'languageOnly',
    fallbackLng: 'he',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
