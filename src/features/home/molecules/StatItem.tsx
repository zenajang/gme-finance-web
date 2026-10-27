import type { ReactNode } from 'react';

interface StatItemProps {
  icon: ReactNode;
  value: string;
  label: string;
}

// 아이콘 선은 검정, 마지막 요소만 빨강 (시안 아이콘 규칙)
const StatItem = ({ icon, value, label }: StatItemProps) => {
  return (
    <div className="relative grid grid-cols-[42px_1fr] items-center gap-x-2.5 overflow-hidden rounded-[10px] border border-[#e5e7eb] bg-white px-[18px] py-4 before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-[#df1f26] max-lg:p-3.5">
      <span
        aria-hidden="true"
        className="row-span-2 flex size-9 items-center justify-center [&_svg]:size-[22px] [&_svg]:fill-none [&_svg]:stroke-[#222b38] [&_svg]:stroke-[1.75] [&_svg>*:last-child]:stroke-[#e51f2b]"
        style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
      >
        {icon}
      </span>
      <strong className="text-[29px] leading-none font-extrabold tracking-[-0.04em] text-[#151922] max-md:text-[25px]">
        {value}
      </strong>
      <span className="mt-[5px] text-xs leading-[1.35] font-medium text-[#606773]">{label}</span>
    </div>
  );
};

export default StatItem;
