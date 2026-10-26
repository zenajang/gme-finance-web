import type { ReactNode } from 'react';

interface EyebrowProps {
  children: ReactNode;
}

// 섹션 라벨: 빨간 선 + 대문자
export default function Eyebrow({ children }: EyebrowProps) {
  return (
    <span className="inline-flex items-center gap-[9px] text-xs font-bold tracking-[0.12em] text-brand uppercase before:inline-block before:h-0.5 before:w-[18px] before:bg-brand">
      {children}
    </span>
  );
}
