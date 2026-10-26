'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isCurrentPath, NAV_ITEMS } from '@/features/common/header/navigation';

// hover 하면 아래 빨간 밑줄이 왼쪽부터 늘어난다. 현재 페이지는 밑줄이 항상 보인다
const LINK =
  'relative px-px py-1.5 text-sm font-semibold tracking-[.005em] whitespace-nowrap transition-colors duration-200 ease-gme after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-brand after:transition-[right] after:duration-250 after:ease-gme hover:text-brand hover:after:right-0';

const DesktopNav = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="flex items-center gap-[34px] max-lg:hidden">
      {NAV_ITEMS.map(({ label, href }) => {
        if (!href) {
          return (
            <a
              key={label}
              role="link"
              aria-disabled="true"
              tabIndex={0}
              className={`${LINK} group inline-flex cursor-pointer items-center gap-[5px] text-ink-70 after:right-full`}
            >
              {label}
              <svg aria-hidden="true" className="size-[11px] shrink-0 opacity-50 transition duration-200 ease-gme group-hover:translate-y-px group-hover:opacity-100 group-focus-visible:translate-y-px group-focus-visible:opacity-100" fill="none" viewBox="0 0 24 24">
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
            aria-current={isCurrent ? 'page' : undefined}
            className={`${LINK} ${isCurrent ? 'text-brand after:right-0' : 'text-ink-70 after:right-full'}`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
};

export default DesktopNav;
