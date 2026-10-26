import Section from '@/features/home/molecules/Section';
import SectionHead from '@/features/home/molecules/SectionHead';

const REASONS = [
  'Trusted Since 2016',
  '24/7 Support in Your Language',
  'Simple Application Process',
  'Zero Processing & Early Repayment Fees',
  'Support for Eligible Visa Holders',
  'Easy Application via GME App',
] as const;

const WhyChooseSection = () => {
  return (
    <Section id="why" tone="gray">
      <SectionHead eyebrow="Why Choose GME Finance?" title="Simple, transparent & reliable." />
      <ul className="grid grid-cols-2 gap-x-[18px] gap-y-3.5 max-md:grid-cols-1">
        {REASONS.map((reason) => (
          <li
            key={reason}
            className="flex items-center gap-[13px] rounded-[10px] border border-[#e1e3e7] bg-white px-5 py-[18px] text-[#202228]"
          >
            <span
              aria-hidden="true"
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-50 font-black text-brand"
            >
              ✓
            </span>
            <strong>{reason}</strong>
          </li>
        ))}
      </ul>
      <p className="mt-[18px] text-[13px] leading-[1.55] text-[#70747c]">
        Loan approval, amount, rate and eligibility are subject to individual screening and
        applicable terms.
      </p>
    </Section>
  );
};

export default WhyChooseSection;
