'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import CountriesDropdown from '@/features/common/header/molecules/CountriesDropdown';
import { isCurrentPath, NAV_ITEMS } from '@/features/common/header/navigation';

// hover 하면 아래 빨간 밑줄이 왼쪽부터 늘어난다. 현재 페이지는 밑줄이 항상 보인다
const LINK =
  'relative px-px py-1.5 text-sm font-semibold tracking-[.005em] whitespace-nowrap transition-colors duration-200 ease-gme after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-brand after:transition-[right] after:duration-250 after:ease-gme hover:text-brand hover:after:right-0';

const DesktopNav = () => {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <nav aria-label={t('header.primaryNav')} className="flex items-center gap-[34px] max-lg:hidden">
      {NAV_ITEMS.map(({ key, href }) => {
        if (!href) return <CountriesDropdown key={key} linkClassName={LINK} />;
        const isCurrent = isCurrentPath(pathname, href);
        return (
          <Link
            key={key}
            href={href}
            aria-current={isCurrent ? 'page' : undefined}
            className={`${LINK} ${isCurrent ? 'text-brand after:right-0' : 'text-ink-70 after:right-full'}`}
          >
            {t(`header.${key}`)}
          </Link>
        );
      })}
    </nav>
  );
};

export default DesktopNav;
