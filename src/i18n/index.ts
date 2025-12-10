'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ko from './locales/ko.json';
import vi from './locales/vi.json';
import th from './locales/th.json';
import fil from './locales/fil.json';
import id from './locales/id.json';
import km from './locales/km.json';
import my from './locales/my.json';
import ne from './locales/ne.json';
import hi from './locales/hi.json';
import ur from './locales/ur.json';
import bn from './locales/bn.json';
import si from './locales/si.json';
import mn from './locales/mn.json';
import uz from './locales/uz.json';
import ru from './locales/ru.json';

const resources = {
  en: { translation: en },
  ko: { translation: ko },
  vi: { translation: vi },
  th: { translation: th },
  fil: { translation: fil },
  id: { translation: id },
  km: { translation: km },
  my: { translation: my },
  ne: { translation: ne },
  hi: { translation: hi },
  ur: { translation: ur },
  bn: { translation: bn },
  si: { translation: si },
  mn: { translation: mn },
  uz: { translation: uz },
  ru: { translation: ru },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
