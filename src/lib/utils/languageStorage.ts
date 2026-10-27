import { getLanguageStorageKey, type CountryCode, type LanguageCode } from '@/i18n/config';

const ONE_YEAR = 60 * 60 * 24 * 365;

const writeCookie = (key: string, value: string, maxAge: number) => {
  const secure = window.location.protocol === 'https:' ? '; secure' : '';
  document.cookie = `${key}=${value}; path=/; max-age=${maxAge}; samesite=lax${secure}`;
};

// 쿠키에서 값 하나 읽기
export const readLanguageCookie = (country: CountryCode) => {
  const key = getLanguageStorageKey(country);
  return document.cookie
    .split('; ')
    .find((item) => item.startsWith(`${key}=`))
    ?.slice(key.length + 1);
};

// 고른 언어를 localStorage 와 쿠키에 같이 저장한다. 쿠키는 서버가 첫 렌더 언어를 정할 때 읽는다
export const saveLanguage = (country: CountryCode, code: LanguageCode) => {
  const key = getLanguageStorageKey(country);
  localStorage.setItem(key, code);
  writeCookie(key, code, ONE_YEAR);
};

// localStorage 와 쿠키에서 같이 지운다
export const removeLanguage = (country: CountryCode) => {
  const key = getLanguageStorageKey(country);
  localStorage.removeItem(key);
  writeCookie(key, '', 0);
};
