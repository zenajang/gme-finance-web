'use client';

import { useTranslation } from 'react-i18next';
import { LANGUAGE_LABELS, useLanguageSwitch } from '@/lib/hooks/useLanguageSwitch';

interface LanguageSwitchProps {
  className?: string;
}

// 언어 선택 (시안 lang-switch)
const LanguageSwitch = ({ className = '' }: LanguageSwitchProps) => {
  const { t } = useTranslation();
  const { languages, currentLanguage, changeLanguage } = useLanguageSwitch();

  return (
    <div
      role="group"
      aria-label={t('header.language')}
      className={`inline-flex items-center gap-0.5 rounded-[7px] border border-line bg-fog p-[3px] ${className}`}
    >
      {languages.map(({ code }) => {
        const isSelected = currentLanguage === code;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={isSelected}
            onClick={() => changeLanguage(code)}
            className={`rounded-[5px] px-2.5 py-[5px] text-xs leading-none font-bold tracking-[.045em] transition duration-200 ease-gme ${
              isSelected
                ? 'bg-white text-ink shadow-[0_1px_2px_rgba(17,18,22,.09)]'
                : 'text-slate hover:text-ink'
            }`}
          >
            {LANGUAGE_LABELS[code]}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitch;
