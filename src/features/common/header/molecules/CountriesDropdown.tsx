'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { COUNTRIES } from '@/constants/countries';
import { useClickOutside } from '@/lib/hooks/useClickOutside';
import { getCountryPath } from '@/lib/utils/country';

interface CountriesDropdownProps {
  linkClassName: string;
}

// 2열로 나누되 왼쪽 열부터 위 → 아래 순서로 채운다
const ROW_COUNT = Math.ceil(COUNTRIES.length / 2);

// 헤더 Countries 메뉴: 누르면 나라 목록 패널이 열린다 (web-gmeremit 국가 드롭다운과 같은 UI)
const CountriesDropdown = ({ linkClassName }: CountriesDropdownProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeDropdown = useCallback(() => setIsOpen(false), []);
  useClickOutside(dropdownRef, closeDropdown, isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="countries-dropdown"
        onClick={() => setIsOpen((isOpenNow) => !isOpenNow)}
        className={`${linkClassName} group inline-flex cursor-pointer items-center gap-[5px] ${
          isOpen ? 'text-brand after:right-0' : 'text-ink-70 after:right-full'
        }`}
      >
        {t('header.countries')}
        <svg
          aria-hidden="true"
          className={`size-[11px] shrink-0 transition duration-250 ease-gme group-hover:opacity-100 ${
            isOpen ? 'rotate-180 opacity-100' : 'opacity-50'
          }`}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
        </svg>
      </button>
      {isOpen && (
        <div id="countries-dropdown" className="absolute top-full left-1/2 z-50 mt-2 w-fit -translate-x-1/2">
          <ul
            className="grid grid-flow-col grid-cols-[auto_auto] gap-x-10 gap-y-5 rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.04)]"
            style={{ gridTemplateRows: `repeat(${ROW_COUNT}, auto)` }}
          >
            {COUNTRIES.map((country) => (
              <li key={country.code}>
                <Link
                  href={getCountryPath(country)}
                  onClick={closeDropdown}
                  className="inline-flex items-center gap-1 text-[15px] font-medium whitespace-nowrap text-[#181818] transition-colors duration-150 hover:text-brand"
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
        </div>
      )}
    </div>
  );
};

export default CountriesDropdown;
