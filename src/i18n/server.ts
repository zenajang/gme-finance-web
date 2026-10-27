import { createInstance } from 'i18next';
import { cookies } from 'next/headers';
import {
  getLanguageStorageKey,
  PAGE_LANGUAGES,
  resolvePageLanguage,
  type CountryCode,
} from './config';
import { resources } from './resources';

// 서버 전용 인스턴스. 언어는 바꾸지 않고 요청마다 getFixedT 로 고정 번역 함수를 만든다
const serverI18n = createInstance();
serverI18n.init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  initAsync: false,
  interpolation: { escapeValue: false },
});

// 쿠키에 저장된 페이지별 언어. 없거나 쓸 수 없는 값이면 기본 언어
export const getPageLanguage = async (country: CountryCode) => {
  const cookieStore = await cookies();
  return resolvePageLanguage(country, cookieStore.get(getLanguageStorageKey(country))?.value);
};

// 서버 컴포넌트용 번역 함수
export const getServerT = async (country: CountryCode) =>
  serverI18n.getFixedT(await getPageLanguage(country));

// 클라이언트 I18nProvider 첫 렌더에 넘길 페이지별 언어 (SSR 과 하이드레이션 언어를 맞춘다)
export const getPageLanguages = async () => {
  const entries = await Promise.all(
    (Object.keys(PAGE_LANGUAGES) as CountryCode[]).map(
      async (country) => [country, await getPageLanguage(country)] as const,
    ),
  );
  return Object.fromEntries(entries) as Record<CountryCode, ReturnType<typeof resolvePageLanguage>>;
};
