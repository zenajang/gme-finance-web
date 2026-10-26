import type { ReactNode } from 'react';

interface DisclaimerProps {
  children: ReactNode;
}

// 정보 아이콘 + 회색 안내문 박스
const Disclaimer = ({ children }: DisclaimerProps) => {
  return (
    <div className="mt-[18px] flex items-start gap-[9px] rounded-[7px] border border-line bg-fog px-4 py-3.5 text-[13px] leading-[1.55] text-slate-soft">
      <svg aria-hidden="true" className="mt-0.5 size-[15px] shrink-0" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 11v5.3M12 8.2v.1" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
      <span>{children}</span>
    </div>
  );
};

export default Disclaimer;
