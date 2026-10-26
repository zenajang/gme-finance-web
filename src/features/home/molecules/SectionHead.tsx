import type { ReactNode } from 'react';
import Eyebrow from '@/features/home/atoms/Eyebrow';

interface SectionHeadProps {
  eyebrow: ReactNode;
}

export default function SectionHead({ eyebrow }: SectionHeadProps) {
  return (
    <div className="mb-[34px] max-w-[760px]">
      <Eyebrow>{eyebrow}</Eyebrow>
    </div>
  );
}
