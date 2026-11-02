import {
  getDefaultLanguage,
  getLanguageStorageKey,
  PAGE_LANGUAGES,
  type CountryCode,
} from './config';

// 저장된 언어를 적용하는 동안 본문을 숨기는 <html> 속성. globals.css 에서 숨기고 I18nProvider 가 푼다
export const LANGUAGE_PENDING_ATTRIBUTE = 'data-language-pending';

const PENDING_TIMEOUT_MS = 3000;

const pageLanguages = Object.fromEntries(
  (Object.keys(PAGE_LANGUAGES) as CountryCode[]).map((country) => [
    country,
    {
      storageKey: getLanguageStorageKey(country),
      default: getDefaultLanguage(country),
      languages: PAGE_LANGUAGES[country],
    },
  ]),
);

// 첫 페인트 전에 실행되는 인라인 스크립트. 저장된 언어가 기본 언어와 다를 때만 본문을 숨겨서
// 정적 HTML 의 기본 언어가 잠깐 보였다 바뀌는 것을 막는다. JS 가 실패해도 일정 시간 뒤에는 보여준다
export const languagePendingScript = `(function () {
  try {
    var pages = ${JSON.stringify(pageLanguages)};
    var segment = location.pathname.split('/')[1] || '';
    var country = pages[segment] ? segment : 'main';
    var page = pages[country];
    var saved = localStorage.getItem(page.storageKey);
    if (!saved || saved === page.default || page.languages.indexOf(saved) === -1) return;
    var root = document.documentElement;
    root.setAttribute('${LANGUAGE_PENDING_ATTRIBUTE}', '');
    setTimeout(function () { root.removeAttribute('${LANGUAGE_PENDING_ATTRIBUTE}'); }, ${PENDING_TIMEOUT_MS});
  } catch (error) {}
})();`;
