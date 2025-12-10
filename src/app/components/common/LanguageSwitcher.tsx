'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import { getCountryFromPath, getAvailableLanguages, LanguageCode } from '@/i18n/config';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'desktop' | 'mobile';
}

// 언어별 짧은 코드
const LANG_SHORT: Record<LanguageCode, string> = {
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

export default function LanguageSwitcher({ className = '', variant = 'desktop' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);

  const country = getCountryFromPath(pathname);
  const availableLanguages = getAvailableLanguages(country);

  // 현재 언어 인덱스 추적
  useEffect(() => {
    const index = availableLanguages.findIndex(lang => lang.code === i18n.language);
    setActiveIndex(index >= 0 ? index : 0);
  }, [i18n.language, availableLanguages]);

  const handleLanguageChange = (langCode: LanguageCode, index: number) => {
    setActiveIndex(index);
    i18n.changeLanguage(langCode);
    // 나라별로 선택한 언어 저장
    const storageKey = `i18nextLng_${country}`;
    localStorage.setItem(storageKey, langCode);
  };

  // 모바일 버전
  if (variant === 'mobile') {
    return (
      <div className={`px-6 py-4 border-t border-gray-100 ${className}`}>
        <div className="flex items-center justify-center">
          <div className="relative flex items-center bg-gray-100 rounded-full p-1">
            {/* 슬라이딩 배경 */}
            <div
              className="absolute h-[calc(100%-8px)] bg-white rounded-full shadow-sm transition-all duration-300 ease-out"
              style={{
                width: `calc(${100 / availableLanguages.length}% - 4px)`,
                left: `calc(${(100 / availableLanguages.length) * activeIndex}% + 2px)`,
              }}
            />
            {availableLanguages.map((lang, index) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code, index)}
                className={`relative z-10 flex-1 px-4 py-1.5 text-sm font-medium text-center transition-colors duration-300 ${i18n.language === lang.code
                    ? 'text-gray-800'
                    : 'text-gray-500'
                  }`}
              >
                {LANG_SHORT[lang.code]}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 데스크톱 버전 
  return (
    <div className={`relative flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1 ${className}`}>
      {/* 슬라이딩 배경 */}
      <div
        className="absolute h-[calc(100%-8px)] bg-white rounded-full shadow-sm transition-all duration-300 ease-out"
        style={{
          width: `calc(${100 / availableLanguages.length}% - 4px)`,
          left: `calc(${(100 / availableLanguages.length) * activeIndex}% + 2px)`,
        }}
      />
      {availableLanguages.map((lang, index) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code, index)}
          className={`relative z-10 text-center px-4 py-1 text-sm font-medium transition-colors duration-300 ${i18n.language === lang.code
              ? 'text-gray-800'
              : 'text-white/80 hover:text-white'
            }`}
        >
          {lang.code === 'en' ? <>{LANG_SHORT[lang.code]}&nbsp;</> : <>&nbsp;{LANG_SHORT[lang.code]}</>}
        </button>
      ))}
    </div>
  );
}
