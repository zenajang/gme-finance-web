'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { COUNTRIES } from '@/constants/countries';
import { getCountryPath } from '@/lib/utils/country';

interface MobileCountriesProps {
  onNavigate: () => void;
}

// 모바일 메뉴 Countries: 누르면 아래로 나라 목록이 펼쳐진다
const MobileCountries = ({ onNavigate }: MobileCountriesProps) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-line">
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls="mobile-countries"
        onClick={() => setIsExpanded((isExpandedNow) => !isExpandedNow)}
        className="flex w-full cursor-pointer items-center gap-[7px] px-1 py-4 text-left text-base font-semibold text-ink transition-colors duration-200 ease-gme hover:text-brand"
      >
        {t('header.countries')}
        <svg
          aria-hidden="true"
          className={`size-[11px] shrink-0 transition duration-250 ease-gme ${isExpanded ? 'rotate-180 opacity-100' : 'opacity-45'}`}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
        </svg>
      </button>
      {isExpanded && (
        <ul id="mobile-countries" className="pb-3">
          {COUNTRIES.map((country) => (
            <li key={country.code}>
              <Link
                href={getCountryPath(country)}
                onClick={onNavigate}
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-ink transition-colors duration-150 hover:text-brand"
              >
                <Image
                  src={country.flag}
                  alt=""
                  width={20}
                  height={20}
                  className="size-5 shrink-0 rounded-full object-cover"
                />
                {country.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MobileCountries;
