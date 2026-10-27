'use client';

import { LANGUAGE_LABELS, useLanguageSwitch } from '@/lib/hooks/useLanguageSwitch';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'desktop' | 'mobile';
  forceVisible?: boolean;
  size?: 'normal' | 'compact';
}

export default function LanguageSwitcher({ className = '', variant = 'desktop', forceVisible = false, size = 'normal' }: LanguageSwitcherProps) {
  const { languages: availableLanguages, currentLanguage, changeLanguage } = useLanguageSwitch();
  const activeIndex = Math.max(0, availableLanguages.findIndex(lang => lang.code === currentLanguage));

  // 모바일 버전
  if (variant === 'mobile') {
    const mobileButtonClass = size === 'compact' ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm';
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
            {availableLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`relative z-10 flex-1 ${mobileButtonClass} font-medium text-center transition-colors duration-300 ${currentLanguage === lang.code
                    ? 'text-gray-800'
                    : 'text-gray-500'
                  }`}
              >
                {LANGUAGE_LABELS[lang.code]}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 데스크톱 버전
  const desktopButtonClass = size === 'compact' ? 'px-3 py-0.5 text-xs' : 'px-4 py-1 text-sm';
  return (
    <div className={`relative flex items-center rounded-full p-1 ${forceVisible ? 'bg-white border border-gray-300 shadow-sm' : 'bg-white/10 backdrop-blur-sm'} ${className}`}>
      {/* 슬라이딩 배경 */}
      <div
        className={`absolute h-[calc(100%-8px)] rounded-full shadow-sm transition-all duration-300 ease-out ${forceVisible ? 'bg-gray-900' : 'bg-white'}`}
        style={{
          width: `calc(${100 / availableLanguages.length}% - 4px)`,
          left: `calc(${(100 / availableLanguages.length) * activeIndex}% + 2px)`,
        }}
      />
      {availableLanguages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`relative z-10 text-center ${desktopButtonClass} font-medium transition-colors duration-300 ${
            forceVisible
              ? currentLanguage === lang.code ? 'text-white' : 'text-gray-600 hover:text-gray-900'
              : currentLanguage === lang.code ? 'text-gray-800' : 'text-white/80 hover:text-white'
          }`}
        >
          {lang.code === 'en' ? <>{LANGUAGE_LABELS[lang.code]}&nbsp;</> : <>&nbsp;{LANGUAGE_LABELS[lang.code]}</>}
        </button>
      ))}
    </div>
  );
}
