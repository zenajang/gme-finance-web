'use client';

import type { ComponentProps } from 'react';
import Link from 'next/link';

// 모양 · 크기별 클래스. 쓰는 곳에서는 appearance 로 키만 고른다
const VARIANTS = {
  // 빨간 CTA (대출 신청)
  primary:
    'gap-[9px] border-[1.5px] border-transparent bg-brand tracking-[-0.025em] text-white transition duration-[220ms] ease-gme hover:-translate-y-px hover:bg-brand-dark hover:shadow-[0_10px_22px_rgba(215,25,32,.25)]',
  // 흰 바탕 테두리 버튼 (로그인)
  outline:
    'border border-line bg-white text-ink-70 transition-colors duration-200 ease-gme hover:border-[#f0b3b5] hover:bg-brand-50 hover:text-brand',
} as const;

const SIZES = {
  sm: 'px-[17px] py-[9px] text-[13.5px]',
  md: 'px-[22px] py-[11px] text-sm',
  lg: 'px-[26px] py-[14px] text-[14.5px]',
} as const;

interface LinkButtonAppearance {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
}

interface LinkButtonProps extends ComponentProps<typeof Link> {
  appearance?: LinkButtonAppearance;
}

// 버튼 모양 링크. className 은 배치용(숨김 · 여백)만 덧붙인다
const LinkButton = ({ appearance, className = '', children, ...linkProps }: LinkButtonProps) => {
  const { variant = 'primary', size = 'lg' } = appearance ?? {};

  return (
    <Link
      className={`inline-flex items-center justify-center rounded-[7px] font-semibold whitespace-nowrap ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...linkProps}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
