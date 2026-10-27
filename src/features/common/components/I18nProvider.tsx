'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import i18n from '@/i18n';
import {
  getCountryFromPath,
  getLanguageStorageKey,
  resolvePageLanguage,
  type CountryCode,
  type LanguageCode,
} from '@/i18n/config';
import { readLanguageCookie, removeLanguage, saveLanguage } from '@/lib/utils/languageStorage';

interface I18nProviderProps {
  // 서버가 쿠키로 정한 페이지별 언어. 첫 렌더를 SSR 과 같은 언어로 맞춘다
  initialLanguages: Record<CountryCode, LanguageCode>;
  children: ReactNode;
}

export default function I18nProvider({ initialLanguages, children }: I18nProviderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const country = getCountryFromPath(pathname);

  // 요청 · 사용자마다 언어가 다르므로 전역 인스턴스를 복제해서 쓴다 (리소스는 공유)
  const [instance] = useState(() => i18n.cloneInstance({ lng: initialLanguages[country] }));

  // 하이드레이션 후 localStorage 를 기준으로 언어와 쿠키를 맞춘다.
  // 쿠키가 바뀌면 서버 컴포넌트도 새 언어로 다시 그리도록 refresh 한다
  useEffect(() => {
    const saved = localStorage.getItem(getLanguageStorageKey(country));
    const language = resolvePageLanguage(country, saved);
    const cookie = readLanguageCookie(country);

    let isCookieChanged = false;
    if (saved === language) {
      if (cookie !== saved) {
        saveLanguage(country, language);
        isCookieChanged = true;
      }
    } else if (saved !== null || cookie !== undefined) {
      // 저장값이 없거나 쓸 수 없는 값이면 둘 다 지우고 기본 언어로
      removeLanguage(country);
      isCookieChanged = cookie !== undefined;
    }

    if (instance.language !== language) instance.changeLanguage(language);
    if (isCookieChanged) router.refresh();
  }, [country, instance, router]);

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
}
