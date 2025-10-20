'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="px-15">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="GME Finance"
              width={120}
              height={40}
              className="object-contain"
            />
            <span className="text-white/80 text-xs leading-tight">
              (주) 지엠이대부 2019-금감원-1801 (대표자)
            </span>
          </Link>
          <nav className="flex items-center gap-20">
            <Link
              href="/"
              className="text-white hover:text-gray-300 transition-colors text-lg font-small"
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
                className="text-white hover:text-gray-300 transition-colors text-lg font-small"
              >
                About Us
              </Link>
              {isAboutHovered && (
                <div className="absolute top-full left-[-15px] mt-1 w-40 bg-black/80 rounded-lg shadow-xl py-3">
                  <Link
                    href="/about/company"
                    className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black transition-colors"
                  >
                    회사소개
                  </Link>
                  <Link
                    href="/about/history"
                    className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black transition-colors"
                  >
                    연혁
                  </Link>
                  <Link
                    href="/about/vision"
                    className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black transition-colors"
                  >
                    비전
                  </Link>
                  <Link
                    href="/about/ceo"
                    className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black transition-colors"
                  >
                    CEO 인사말
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/products"
              className="text-white hover:text-gray-300 transition-colors text-lg font-small"
            >
              Products
            </Link>

            <Link
              href="/careers"
              className="text-white hover:text-gray-300 transition-colors text-lg font-small"
            >
              Careers
            </Link>

            <Link
              href="/countries"
              className="text-white hover:text-gray-300 transition-colors text-lg font-small"
            >
              Countries
            </Link>

            <Link
              href="/notices"
              className="text-white hover:text-gray-300 transition-colors text-lg font-small"
            >
              Notices
            </Link>

            <Link
              href="/login"
              className="text-white hover:text-gray-300 transition-colors text-lg font-small"
            >
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}