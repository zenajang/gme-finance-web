import Section from '@/features/home/molecules/Section';
import SectionHead from '@/features/home/molecules/SectionHead';

const FAQS = [
  { question: 'Do I need a guarantor?', answer: 'No. A guarantor is not required.' },
  {
    question: 'Can I apply if I have an existing loan?',
    answer:
      'Applications are assessed individually based on eligibility and the applicant’s financial circumstances.',
  },
  {
    question: 'Does applying guarantee loan approval?',
    answer: 'No. All applications are subject to individual assessment and approval.',
  },
  { question: 'Can I repay my loan early?', answer: 'Yes. There is no early repayment penalty.' },
  {
    question: 'Can I apply if my visa will expire soon?',
    answer:
      'Eligibility depends on your visa status, remaining period of stay, and individual assessment.',
  },
  {
    question: 'How is my personal information protected?',
    answer:
      'Personal information is handled in accordance with applicable Korean laws, including the Personal Information Protection Act (PIPA).',
  },
] as const;

// 네이티브 details 로 아코디언 구현. 같은 name 이라 하나를 열면 나머지는 닫힌다 (시안 동작).
// 펼침 애니메이션은 ::details-content 를 지원하는 브라우저에서만 동작하고, 나머지는 바로 열린다.
const FaqSection = () => {
  return (
    <Section id="faq" tone="gray">
      <SectionHead eyebrow="FAQ" title="Common questions" />
      <div className="max-w-[800px] border-t border-line">
        {FAQS.map(({ question, answer }) => (
          <details
            key={question}
            name="faq"
            className="group border-b border-line [interpolate-size:allow-keywords] open:[&::details-content]:h-auto [&::details-content]:h-0 [&::details-content]:overflow-hidden [&::details-content]:transition-[height,content-visibility] [&::details-content]:duration-400 [&::details-content]:ease-gme [&::details-content]:[transition-behavior:allow-discrete]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-0.5 py-[23px] font-semibold text-ink hover:[&>span:first-child]:text-brand [&::-webkit-details-marker]:hidden">
              <span>{question}</span>
              <span
                aria-hidden="true"
                className="flex size-[26px] shrink-0 items-center justify-center rounded-[5px] border border-line bg-fog text-brand transition duration-300 ease-gme group-open:rotate-[135deg] group-open:border-brand group-open:bg-brand group-open:text-white"
              >
                <svg className="size-[13px]" fill="none" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
                </svg>
              </span>
            </summary>
            <p className="max-w-[660px] px-0.5 pb-6 text-[14.5px] leading-[1.55] text-ink-70">
              {answer}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
};

export default FaqSection;
