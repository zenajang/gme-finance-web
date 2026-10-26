import type { ReactNode } from 'react';
import Eyebrow from '@/features/home/atoms/Eyebrow';

interface SectionHeadProps {
  eyebrow: ReactNode;
  title?: ReactNode;
}

const SectionHead = ({ eyebrow, title }: SectionHeadProps) => {
  return (
    <div className="mb-[34px] max-w-[760px]">
      <Eyebrow>{eyebrow}</Eyebrow>
      {title && (
        <h2 className="mt-3 max-w-[720px] text-[clamp(28px,3vw,40px)] leading-[1.16] font-bold tracking-[-0.035em] text-ink">
          {title}
        </h2>
      )}
    </div>
  );
};

export default SectionHead;
