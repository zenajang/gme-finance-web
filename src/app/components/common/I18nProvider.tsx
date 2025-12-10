'use client';

import { ReactNode, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { usePathname } from 'next/navigation';
import i18n from '@/i18n';
import { getCountryFromPath, getDefaultLanguage, PAGE_LANGUAGES } from '@/i18n/config';

interface I18nProviderProps {
  children: ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // i18n이 이미 초기화되었는지 확인
    if (i18n.isInitialized) {
      setIsInitialized(true);
    } else {
      i18n.on('initialized', () => {
        setIsInitialized(true);
      });
    }
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const country = getCountryFromPath(pathname);
    const availableLanguages = PAGE_LANGUAGES[country];

    // main 페이지는 항상 영어가 기본
    if (country === 'main') {
      const defaultLanguage = getDefaultLanguage(country);
      if (i18n.language !== defaultLanguage) {
        i18n.changeLanguage(defaultLanguage);
      }
      return;
    }

    // 나라 페이지는 저장된 언어 사용
    const storageKey = `i18nextLng_${country}`;
    const savedLanguage = localStorage.getItem(storageKey);

    // 저장된 언어가 있고, 해당 페이지에서 사용 가능한 언어인 경우
    if (savedLanguage && availableLanguages.includes(savedLanguage as typeof availableLanguages[number])) {
      if (i18n.language !== savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    } else {
      // 저장된 언어가 없거나 사용 불가능한 경우, 기본 언어로 설정
      const defaultLanguage = getDefaultLanguage(country);
      if (i18n.language !== defaultLanguage) {
        i18n.changeLanguage(defaultLanguage);
      }
    }
  }, [pathname, isInitialized]);

  if (!isInitialized) {
    return null;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
