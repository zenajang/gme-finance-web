import Section from '@/features/home/molecules/Section';
import SectionHead from '@/features/home/molecules/SectionHead';

// 신청 필요 서류
const REQUIRED_DOCUMENTS = [
  'Alien Registration Card',
  'Valid Passport',
  'Work Contract',
] as const;

const DocumentsSection = () => {
  return (
    <Section id="documents" tone="gray">
      <SectionHead eyebrow="Documents" title="What do you need?" />
      <ul className="grid max-w-[780px] grid-cols-3 gap-3.5 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {REQUIRED_DOCUMENTS.map((document) => (
          <li
            key={document}
            className="flex items-center gap-3.5 rounded-[10px] border border-line bg-white px-5 py-[18px] transition hover:border-line-strong hover:shadow-[0_10px_24px_rgba(17,18,22,.09)]"
          >
            <span
              aria-hidden="true"
              className="flex size-[26px] shrink-0 items-center justify-center rounded-[5px] bg-brand text-white"
            >
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24">
                <path
                  d="M4 12.5l5 5L20 6.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.2"
                />
              </svg>
            </span>
            <span className="text-[14.5px] font-semibold">{document}</span>
          </li>
        ))}
      </ul>
      <div className="mt-[26px] flex max-w-[780px] items-start gap-3 rounded-[7px] border border-line bg-fog px-5 py-[18px]">
        <svg aria-hidden="true" className="mt-px size-[18px] shrink-0 text-brand" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 11v5.3M12 8.2v.1" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        </svg>
        <p className="text-sm text-ink-70">Additional documents may be requested during review.</p>
      </div>
    </Section>
  );
};

export default DocumentsSection;
