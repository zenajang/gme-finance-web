'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          bg-white 
          ${isScrolled
            ? 'md:bg-black/80 md:backdrop-blur-sm md:shadow-lg lg:bg-black/80 lg:backdrop-blur-sm lg:shadow-lg'
            : 'md:bg-transparent lg:bg-transparent'
          }
        `}
      >
        <div className="px-4 md:px-8 lg:px-15">
          <div className="flex items-center justify-between h-14 md:h-20 lg:h-20">
            <Link href="/" className="flex items-center gap-2 md:gap-3 lg:gap-3">
              <Image
                src="/images/logo.png"
                alt="GME Finance"
                width={90}
                height={30}
                className="object-contain md:w-[140px] md:h-[140px] lg:w-[140px] lg:h-[140px]"
              />
              <span className="hidden md:block lg:block text-white/80 text-xs leading-tight">
                (주) 지엠이대부 2019-금감원-1801 (대표자)
              </span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden lg:hidden flex flex-col justify-center items-center w-10 h-10 p-2"
              aria-label="메뉴"
            >
              <span className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-1 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>

            {/* 데스크톱 */}
            <nav className="hidden md:flex lg:flex items-center gap-12 md:gap-12 lg:gap-20">
              <Link
                href="/"
                className="text-white hover:text-gray-300 transition-colors text-lg font-medium"
              >
                Home
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setIsAboutHovered(true)}
                onMouseLeave={() => setIsAboutHovered(false)}
              >
                <Link
                  href="/about"
                  className="text-white hover:text-gray-300 transition-colors text-lg font-medium"
                >
                  About Us
                </Link>
                {isAboutHovered && (
                  <div className="absolute top-full left-[-15px] mt-1 w-40 bg-black/80 rounded-lg shadow-xl py-3">
                    <Link
                      href="/about/company"
                      className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black transition-colors"
                    >
                      Introduction
                    </Link>
                    <Link
                      href="/about/history"
                      className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black transition-colors"
                    >
                      Why choose us
                    </Link>
                    <Link
                      href="/about/blog"
                      className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black transition-colors"
                    >
                      Blog
                    </Link>
                    <Link
                      href="/about/ceo"
                      className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black transition-colors"
                    >
                      Contact Us
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/products"
                className="text-white hover:text-gray-300 transition-colors text-lg font-medium"
              >
                Products
              </Link>

              <Link
                href="/careers"
                className="text-white hover:text-gray-300 transition-colors text-lg font-medium"
              >
                Careers
              </Link>

              <Link
                href="/countries"
                className="text-white hover:text-gray-300 transition-colors text-lg font-medium"
              >
                Countries
              </Link>

              <Link
                href="/notices"
                className="text-white hover:text-gray-300 transition-colors text-lg font-medium"
              >
                Notices
              </Link>

              <Link
                href="/login"
                className="text-white hover:text-gray-300 transition-colors text-lg font-medium"
              >
                Login
              </Link>
              <LanguageSwitcher variant="desktop" />
            </nav>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 슬라이드 */}
      <div className={`
      fixed top-14 left-0 right-0 bottom-0 z-40 bg-white transform transition-transform duration-300 ease-in-out
      ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      md:hidden lg:hidden
    `}>
        <nav className="flex flex-col py-4">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors text-base border-b border-gray-200"
          >
            Home
          </Link>
          {/* About Us with submenu */}
          <div className="border-b border-gray-200">
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors text-base block"
            >
              About Us
            </Link>
            <div className="bg-gray-50">
              <Link
                href="/about/company"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-10 py-2.5 text-gray-600 hover:bg-gray-100 transition-colors text-sm block"
              >
                Introduction
              </Link>
              <Link
                href="/about/history"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-10 py-2.5 text-gray-600 hover:bg-gray-100 transition-colors text-sm block"
              >
                Why choose us
              </Link>
              <Link
                href="/about/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-10 py-2.5 text-gray-600 hover:bg-gray-100 transition-colors text-sm block"
              >
                Blog
              </Link>
              <Link
                href="/about/ceo"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-10 py-2.5 text-gray-600 hover:bg-gray-100 transition-colors text-sm block"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <Link
            href="/products"
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors text-base border-b border-gray-200"
          >
            Products
          </Link>

          <Link
            href="/careers"
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors text-base border-b border-gray-200"
          >
            Careers
          </Link>

          <Link
            href="/countries"
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors text-base border-b border-gray-200"
          >
            Countries
          </Link>

          <Link
            href="/notices"
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors text-base border-b border-gray-200"
          >
            Notices
          </Link>

          <Link
            href="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors text-base border-b border-gray-200"
          >
            Login
          </Link>
          <LanguageSwitcher variant="mobile" />
        </nav>
      </div>

      {/* 모바일 메뉴 오버레이 */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}