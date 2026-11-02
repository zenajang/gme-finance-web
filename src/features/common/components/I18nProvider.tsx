'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { usePathname } from 'next/navigation';
import i18n from '@/i18n';
import {
  getCountryFromPath,
  getDefaultLanguage,
  getLanguageStorageKey,
  resolvePageLanguage,
} from '@/i18n/config';
import { LANGUAGE_PENDING_ATTRIBUTE } from '@/i18n/languagePendingScript';

interface I18nProviderProps {
  children: ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  const pathname = usePathname();
  const country = getCountryFromPath(pathname);

  // 정적 HTML 과 같은 기본 언어로 첫 렌더를 한다 (하이드레이션 불일치 방지)
  const [instance] = useState(() => i18n.cloneInstance({ lng: getDefaultLanguage(country) }));

  const [isLanguageApplied, setIsLanguageApplied] = useState(false);

  // 하이드레이션 후 localStorage 에 저장된 언어로 바꾼다
  useEffect(() => {
    const language = resolvePageLanguage(
      country,
      localStorage.getItem(getLanguageStorageKey(country)),
    );
    instance.changeLanguage(language).then(() => setIsLanguageApplied(true));
  }, [country, instance]);

  // 바뀐 언어가 DOM 에 반영된 다음 렌더에서 숨김을 푼다
  useEffect(() => {
    if (isLanguageApplied) document.documentElement.removeAttribute(LANGUAGE_PENDING_ATTRIBUTE);
  }, [isLanguageApplied]);

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
}
