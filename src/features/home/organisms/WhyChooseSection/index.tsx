'use client';

import { useTranslation } from 'react-i18next';
import { Section, SectionHead } from '@/features/home/molecules';

// 문구는 landing.whyChoose.reasons.<key>
const REASON_KEYS = ['trusted', 'support', 'simple', 'noFees', 'visa', 'app'] as const;

const WhyChooseSection = () => {
  const { t } = useTranslation();

  return (
    <Section id="why" tone="gray">
      <SectionHead
        eyebrow={t('landing.whyChoose.eyebrow')}
        title={t('landing.whyChoose.title')}
      />
      <ul className="grid grid-cols-2 gap-x-[18px] gap-y-3.5 max-md:grid-cols-1">
        {REASON_KEYS.map((key) => (
          <li
            key={key}
            data-reveal
            className="flex items-center gap-[13px] rounded-[10px] border border-[#e1e3e7] bg-white px-5 py-[18px] text-[#202228]"
          >
            <span
              aria-hidden="true"
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-50 font-black text-brand"
            >
              ✓
            </span>
            <strong>{t(`landing.whyChoose.reasons.${key}`)}</strong>
          </li>
        ))}
      </ul>
      <p data-reveal className="mt-[18px] text-[13px] leading-[1.55] text-[#70747c]">
        {t('landing.whyChoose.disclaimer')}
      </p>
    </Section>
  );
};

export default WhyChooseSection;
