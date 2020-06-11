import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import {
  getLanguageCookie,
} from './CookieHelper';

const currentLanguageObj = getLanguageCookie();

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: false,
    lng: currentLanguageObj === undefined ? 'en' : currentLanguageObj.lang,
    fallbackLng: 'en',
    whitelist: ['en', 'ar'],
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
  });

export default i18n;
