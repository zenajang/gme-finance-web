import Image from 'next/image';
import type { ReactNode } from 'react';
import Section from '@/features/home/molecules/Section';
import SectionHead from '@/features/home/molecules/SectionHead';

// 아이콘 선은 검정, 마지막 요소만 빨강 (시안 아이콘 규칙)
const FEATURES: { title: string; description: string; icon: ReactNode }[] = [
  {
    title: 'Apply Loan',
    description: 'Access available loan services in the app.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path className="fill-white" d="M6 3.5h9l3 3V20.5H6z" />
        <path className="fill-white" d="M15 3.5V7h3" />
        <path className="fill-white stroke-[#e51f2b]" d="M9 16.8l.8-3.2 5.7-5.7 2.2 2.2-5.7 5.7z" />
        <path className="fill-white" d="M15.5 7.9l2.2 2.2" />
      </svg>
    ),
  },
  {
    title: 'Check My Loan',
    description: 'Check your loan information in the app.',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect height="18" rx="2" width="14" x="5" y="3" />
        <path d="M9 3.5h6M8.5 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Detailed Information',
    description: 'View detailed loan information.',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 11v5M12 8h.01" />
      </svg>
    ),
  },
  {
    title: 'Loan Inquiry',
    description: 'Send a loan inquiry directly in the app.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 5h16v11H9l-5 4V5Z" />
        <path d="M8 9h8M8 12h5" />
      </svg>
    ),
  },
  {
    title: 'Bank Statements',
    description: 'Access bank statement services.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 9h18L12 4 3 9ZM5 10v7M9 10v7M15 10v7M19 10v7M3 20h18" />
      </svg>
    ),
  },
];

const AppSection = () => {
  return (
    <Section id="gme-app" tone="white">
      <SectionHead
        eyebrow="GME App"
        title="Use the GME App to manage your loan"
        description="Check your loan, view information, send inquiries, and access bank statement services in one place."
      />
      <div
        data-reveal
        className="grid grid-cols-[230px_minmax(0,1fr)] items-start gap-[52px] max-lg:grid-cols-[190px_minmax(0,1fr)] max-lg:gap-8 max-md:grid-cols-1">
        <div className="flex justify-center">
          <Image
            src="/images/home/app-screen.png"
            alt="GME Finance loan app screen"
            width={982}
            height={2048}
            className="h-auto w-full max-w-[205px] max-lg:max-w-[175px] max-md:max-w-[170px]"
          />
        </div>
        <ol className="w-full max-w-[620px] max-md:max-w-none">
          {FEATURES.map(({ title, description, icon }, index) => (
            <li
              key={title}
              className="grid grid-cols-[34px_minmax(0,1fr)] gap-3.5 border-b border-[#dde0e5] py-3.5 first:pt-0"
            >
              <span
                aria-hidden="true"
                className="grid size-[30px] place-items-center rounded-full bg-brand text-[13px] font-extrabold text-white"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="mt-px mb-1 flex items-center gap-[7px] font-[650] tracking-[-0.025em] text-ink">
                  <span
                    aria-hidden="true"
                    className="relative isolate mr-[9px] flex size-[34px] shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_34%_28%,#fff_0_12%,#f8fafc_13%_38%,#eef1f5_72%,#e3e7ed_100%)] shadow-[inset_0_1px_1px_rgba(255,255,255,.95),inset_0_-2px_3px_rgba(31,41,55,.08),0_3px_7px_rgba(17,24,39,.16)] after:absolute after:-bottom-1 after:left-2 after:-z-10 after:h-1 after:w-[18px] after:rounded-full after:bg-[rgba(17,24,39,.1)] after:blur-[2px] max-md:size-8 [&_svg]:relative [&_svg]:size-[22px] [&_svg]:fill-none [&_svg]:stroke-[#222b38] [&_svg]:stroke-[1.75] [&_svg>*:last-child]:stroke-[#e51f2b]"
                    style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
                  >
                    {icon}
                  </span>
                  {title}
                </h3>
                <p className="mt-[3px] text-sm">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
};

export default AppSection;
