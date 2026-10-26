'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOGIN_LINK } from '@/features/common/header/molecules/HeaderActions';
import LanguageSwitch from '@/features/common/header/molecules/LanguageSwitch';
import { isCurrentPath, NAV_ITEMS } from '@/features/common/header/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  isHeaderCompact: boolean;
  onClose: () => void;
}

const LINK =
  'block border-b border-line px-1 py-4 text-base font-semibold transition-colors duration-200 ease-gme hover:text-brand';

// 1024px 미만 전체 화면 메뉴. 헤더 바로 아래에서 위로 살짝 올라오며 나타난다
const MobileMenu = ({ isOpen, isHeaderCompact, onClose }: MobileMenuProps) => {
  const pathname = usePathname();

  return (
    <div
      id="mobile-menu"
      inert={!isOpen}
      className={`fixed inset-x-0 bottom-0 z-[99] overflow-y-auto bg-white px-5 pt-2 pb-8 transition-[opacity,translate,top] duration-250 ease-gme lg:hidden ${
        isHeaderCompact ? 'top-16' : 'top-20'
      } ${isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2.5 opacity-0'}`}
    >
      {NAV_ITEMS.map(({ label, href }) => {
        if (!href) {
          return (
            <a
              key={label}
              role="link"
              aria-disabled="true"
              tabIndex={0}
              className={`${LINK} flex cursor-pointer items-center gap-[7px] text-ink`}
            >
              {label}
              <svg aria-hidden="true" className="size-[11px] shrink-0 opacity-45" fill="none" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
              </svg>
            </a>
          );
        }
        const isCurrent = isCurrentPath(pathname, href);
        return (
          <Link
            key={label}
            href={href}
            onClick={onClose}
            aria-current={isCurrent ? 'page' : undefined}
            className={`${LINK} ${isCurrent ? 'text-brand' : 'text-ink'}`}
          >
            {label}
          </Link>
        );
      })}
      <div className="mt-6 flex items-center justify-between gap-3.5">
        <LanguageSwitch />
        <Link
          href="/login"
          onClick={onClose}
          className={`${LOGIN_LINK} inline-flex items-center justify-center px-[22px] py-[11px] text-sm`}
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
