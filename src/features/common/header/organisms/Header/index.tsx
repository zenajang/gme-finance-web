'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DesktopNav from '@/features/common/header/molecules/DesktopNav';
import HeaderActions from '@/features/common/header/molecules/HeaderActions';
import MobileMenu from '@/features/common/header/organisms/MobileMenu';

const Header = () => {
  const [isCompact, setIsCompact] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);

  // 스크롤하면 헤더 높이를 80 → 64px 로 줄이고 그림자를 단다 (시안 .scrolled)
  useEffect(() => {
    const updateCompact = () => setIsCompact(window.scrollY > 8);
    updateCompact();
    window.addEventListener('scroll', updateCompact, { passive: true });
    return () => window.removeEventListener('scroll', updateCompact);
  }, []);

  // 메뉴가 열려 있을 때 Esc 를 누르거나 데스크톱 폭이 되면 닫는다
  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    const closeOnDesktop = () => setIsMenuOpen(false);
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    window.addEventListener('keydown', closeOnEscape);
    desktopQuery.addEventListener('change', closeOnDesktop);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      desktopQuery.removeEventListener('change', closeOnDesktop);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-[100] border-b bg-white/94 backdrop-blur-[10px] transition-[box-shadow,border-color] duration-350 ease-gme ${
          isCompact
            ? 'border-line shadow-[0_1px_0_rgba(17,18,22,.03),0_10px_28px_rgba(17,18,22,.06)]'
            : 'border-transparent'
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-8 transition-[height] duration-350 ease-gme max-md:px-5 ${
            isCompact ? 'h-16' : 'h-20'
          }`}
        >
          <div className="flex shrink-0 items-center gap-3.5">
            <Link href="/" onClick={closeMenu}>
              <Image
                src="/images/logo-header.png"
                alt="GME Finance"
                width={1452}
                height={412}
                priority
                className="h-11 w-auto"
              />
            </Link>
            <span className="text-xs leading-[1.25] font-semibold whitespace-nowrap text-[#666a73] max-md:hidden">
              (주) 지엠이대부 2019-금감원-1801
            </span>
          </div>
          <DesktopNav />
          <HeaderActions isMenuOpen={isMenuOpen} onToggleMenu={toggleMenu} />
        </div>
      </header>
      {/* 헤더의 backdrop-filter 가 fixed 기준을 바꾸지 않도록 헤더 밖에 둔다 */}
      <MobileMenu isOpen={isMenuOpen} isHeaderCompact={isCompact} onClose={closeMenu} />
    </>
  );
};

export default Header;
