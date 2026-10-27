import { getServerT } from '@/i18n/server';
import { Disclaimer, Section, SectionHead } from '@/features/home/molecules';

// 신청 가능 비자 (D · E · F · G · H 순)
const VISA_CODES = [
  'D-2',
  'E-1',
  'E-2',
  'E-3',
  'E-7',
  'E-9',
  'E-10',
  'F-2',
  'F-4',
  'F-5',
  'F-6',
  'G-1',
  'H-2',
] as const;

const EligibilitySection = async () => {
  const t = await getServerT('main');

  return (
    <Section id="eligibility" tone="gray">
      <SectionHead
        eyebrow={t('landing.eligibility.eyebrow')}
        title={t('landing.eligibility.title')}
      />
      <ul className="grid grid-cols-6 gap-3.5 max-lg:grid-cols-4 max-md:grid-cols-3">
        {VISA_CODES.map((code) => (
          <li
            key={code}
            data-reveal
            className="min-h-[92px] rounded-lg border border-line bg-white px-3 py-[22px] text-center text-xl leading-[1.55] font-bold text-brand tabular-nums transition duration-250 ease-gme hover:-translate-y-[3px] hover:border-brand hover:shadow-[0_10px_24px_rgba(17,18,22,.09)]"
          >
            {code}
          </li>
        ))}
      </ul>
      <Disclaimer>{t('landing.eligibility.disclaimer')}</Disclaimer>
    </Section>
  );
};

export default EligibilitySection;
