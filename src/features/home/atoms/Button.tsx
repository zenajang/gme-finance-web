import type { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  href: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

// 외부 링크 CTA 버튼 (새 탭)
const Button = ({ href, children, onClick }: ButtonProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-[9px] rounded-[7px] border-[1.5px] border-transparent bg-brand px-[26px] py-[14px] text-[14.5px] font-semibold tracking-[-0.025em] whitespace-nowrap text-white transition hover:-translate-y-px hover:bg-brand-dark hover:shadow-[0_10px_22px_rgba(215,25,32,.25)]"
    >
      {children}
    </a>
  );
};

export default Button;
