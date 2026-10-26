import Disclaimer from '@/features/home/molecules/Disclaimer';
import Section from '@/features/home/molecules/Section';
import SectionHead from '@/features/home/molecules/SectionHead';
import { VISA_CODES } from '@/features/home/constants';

const EligibilitySection = () => {
  return (
    <Section id="eligibility" tone="gray">
      <SectionHead eyebrow="Eligibility" title="Visa categories" />
      <ul className="grid grid-cols-6 gap-3.5 max-lg:grid-cols-4 max-sm:grid-cols-3">
        {VISA_CODES.map((code) => (
          <li
            key={code}
            className="min-h-[92px] rounded-lg border border-line bg-white px-3 py-[22px] text-center text-xl leading-[1.55] font-bold text-brand tabular-nums transition hover:-translate-y-[3px] hover:border-brand hover:shadow-[0_10px_24px_rgba(17,18,22,.09)]"
          >
            {code}
          </li>
        ))}
      </ul>
      <Disclaimer>Eligibility is subject to individual review.</Disclaimer>
    </Section>
  );
};

export default EligibilitySection;
