'use client';

import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { getAvailableLanguages, getCountryFromPath, type LanguageCode } from '@/i18n/config';

// 언어 버튼에 표시할 짧은 코드
export const LANGUAGE_LABELS: Record<LanguageCode, string> = {
  en: 'EN',
  ko: 'KR',
  vi: 'VI',
  th: 'TH',
  fil: 'PH',
  id: 'ID',
  km: 'KH',
  my: 'MM',
  ne: 'NP',
  hi: 'IN',
  ur: 'PK',
  bn: 'BD',
  si: 'LK',
  mn: 'MN',
  uz: 'UZ',
  ru: 'RU',
};

// 현재 페이지(나라)에서 고를 수 있는 언어와 언어 변경. 고른 언어는 나라별로 저장한다
export const useLanguageSwitch = () => {
  const { i18n } = useTranslation();
  const country = getCountryFromPath(usePathname());
  const languages = getAvailableLanguages(country);

  const changeLanguage = (code: LanguageCode) => {
    i18n.changeLanguage(code);
    localStorage.setItem(`i18nextLng_${country}`, code);
  };

  return { languages, currentLanguage: i18n.language, changeLanguage };
};
