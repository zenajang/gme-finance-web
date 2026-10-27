'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { LinkButton } from '@/features/common/atoms';
import { LanguageSwitch, MobileCountries } from '@/features/common/header/molecules';
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
  const { t } = useTranslation();

  return (
    <div
      id="mobile-menu"
      inert={!isOpen}
      className={`fixed inset-x-0 bottom-0 z-[99] overflow-y-auto bg-white px-5 pt-2 pb-8 transition-[opacity,translate,top] duration-250 ease-gme lg:hidden ${
        isHeaderCompact ? 'top-16' : 'top-20'
      } ${isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2.5 opacity-0'}`}
    >
      {NAV_ITEMS.map(({ key, href }) => {
        if (!href) return <MobileCountries key={key} onNavigate={onClose} />;
        const isCurrent = isCurrentPath(pathname, href);
        return (
          <Link
            key={key}
            href={href}
            onClick={onClose}
            aria-current={isCurrent ? 'page' : undefined}
            className={`${LINK} ${isCurrent ? 'text-brand' : 'text-ink'}`}
          >
            {t(`header.${key}`)}
          </Link>
        );
      })}
      <div className="mt-6 flex items-center justify-between gap-3.5">
        <LanguageSwitch />
        <LinkButton href="/login" appearance={{ variant: 'outline', size: 'md' }} onClick={onClose}>
          {t('header.login')}
        </LinkButton>
      </div>
    </div>
  );
};

export default MobileMenu;
