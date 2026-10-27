'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './resources';

// 리소스를 번들에 같이 넣으므로 동기로 초기화한다 (SSR 첫 렌더에서 바로 번역)
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    initAsync: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
