// 각 페이지별 사용 가능한 언어 설정
export type CountryCode =
  | 'main'
  | 'vietnam'
  | 'thailand'
  | 'philippines'
  | 'indonesia'
  | 'cambodia'
  | 'myanmar'
  | 'nepal'
  | 'india'
  | 'pakistan'
  | 'bangladesh'
  | 'srilanka'
  | 'mongolia'
  | 'uzbekistan'
  | 'russia';

export type LanguageCode =
  | 'en'   // English
  | 'ko'   // Korean (한국어)
  | 'vi'   // Vietnamese (Tiếng Việt)
  | 'th'   // Thai (ภาษาไทย)
  | 'fil'  // Filipino
  | 'id'   // Indonesian (Bahasa Indonesia)
  | 'km'   // Khmer (ភាសាខ្មែរ)
  | 'my'   // Burmese (မြန်မာဘာသာ)
  | 'ne'   // Nepali (नेपाली)
  | 'hi'   // Hindi (हिन्दी)
  | 'ur'   // Urdu (اردو)
  | 'bn'   // Bengali (বাংলা)
  | 'si'   // Sinhala (සිංහල)
  | 'mn'   // Mongolian (Монгол)
  | 'uz'   // Uzbek (O'zbek)
  | 'ru';  // Russian (Русский)

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
}

// 모든 언어 정보
export const LANGUAGES: Record<LanguageCode, LanguageOption> = {
  en: { code: 'en', name: 'English', nativeName: 'English' },
  ko: { code: 'ko', name: 'Korean', nativeName: '한국어' },
  vi: { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  th: { code: 'th', name: 'Thai', nativeName: 'ภาษาไทย' },
  fil: { code: 'fil', name: 'Filipino', nativeName: 'Filipino' },
  id: { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  km: { code: 'km', name: 'Khmer', nativeName: 'ភាសាខ្មែរ' },
  my: { code: 'my', name: 'Burmese', nativeName: 'မြန်မာဘာသာ' },
  ne: { code: 'ne', name: 'Nepali', nativeName: 'नेपाली' },
  hi: { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  ur: { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  bn: { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  si: { code: 'si', name: 'Sinhala', nativeName: 'සිංහල' },
  mn: { code: 'mn', name: 'Mongolian', nativeName: 'Монгол' },
  uz: { code: 'uz', name: 'Uzbek', nativeName: "O'zbek" },
  ru: { code: 'ru', name: 'Russian', nativeName: 'Русский' },
};

// 각 페이지별 사용 가능한 언어
export const PAGE_LANGUAGES: Record<CountryCode, LanguageCode[]> = {
  main: ['en', 'ko'],
  vietnam: ['en', 'vi'],
  thailand: ['en', 'th'],
  philippines: ['en', 'fil'],
  indonesia: ['en', 'id'],
  cambodia: ['en', 'km'],
  myanmar: ['en', 'my'],
  nepal: ['en', 'ne'],
  india: ['en', 'hi'],
  pakistan: ['en', 'ur'],
  bangladesh: ['en', 'bn'],
  srilanka: ['en', 'si'],
  mongolia: ['en', 'mn'],
  uzbekistan: ['en', 'uz'],
  russia: ['en', 'ru'],
};

// URL 경로에서 country code 추출
export function getCountryFromPath(pathname: string): CountryCode {
  const path = pathname.split('/')[1] || '';
  if (path in PAGE_LANGUAGES) {
    return path as CountryCode;
  }
  return 'main';
}

// 해당 페이지에서 사용 가능한 언어 목록 반환
export function getAvailableLanguages(country: CountryCode): LanguageOption[] {
  const codes = PAGE_LANGUAGES[country] || PAGE_LANGUAGES.main;
  return codes.map(code => LANGUAGES[code]);
}

// 해당 페이지의 기본 언어 반환
// main 페이지는 영어(첫번째), 나라 페이지는 현지어(두번째)가 기본
export function getDefaultLanguage(country: CountryCode): LanguageCode {
  const languages = PAGE_LANGUAGES[country] || PAGE_LANGUAGES.main;
  if (country === 'main') {
    return languages[0]; // 'en'
  }
  // 나라 페이지는 현지어(두번째)가 기본, 없으면 첫번째
  return languages[1] || languages[0];
}
