import Section from '@/features/home/molecules/Section';
import SectionHead from '@/features/home/molecules/SectionHead';
import { ACTIVE_APPLY_STEP, APPLY_STEPS } from '@/features/home/constants';

const CARD = 'rounded-[14px] border bg-white';

const HowToApplySection = () => {
  return (
    <Section id="how-it-works" tone="white">
      <SectionHead eyebrow="How to Apply" title="Apply in four simple steps" />
      <ol className="grid grid-cols-4 items-stretch gap-[18px] max-lg:grid-cols-2 max-sm:grid-cols-1">
        {APPLY_STEPS.map(({ title, description }, index) => (
          <li
            key={title}
            className={`${CARD} flex min-h-[390px] flex-col border-[#e1e3e7] px-6 pt-7 pb-6 shadow-[0_8px_24px_rgba(17,18,22,.04)] max-lg:min-h-[340px] max-sm:min-h-0`}
          >
            <span
              aria-hidden="true"
              className={`mb-[22px] flex size-12 items-center justify-center rounded-full border-2 text-[15px] font-extrabold ${
                index === ACTIVE_APPLY_STEP
                  ? 'border-[#e21d2a] bg-[#e21d2a] text-white'
                  : 'border-[#ef6a70] text-[#e21d2a]'
              }`}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mb-3 min-h-[52px] text-[21px] leading-[1.25] font-[650] tracking-[-0.025em] whitespace-pre-line text-[#17191d] max-sm:min-h-0">
              {title}
            </h3>
            <p className="mb-5 text-[15px] leading-[1.65] text-[#70747c]">{description}</p>
          </li>
        ))}
      </ol>
      <div
        className={`${CARD} mt-6 grid grid-cols-[42px_minmax(0,1fr)] items-center gap-4 border-[#dfe2e7] px-6 py-5 shadow-[0_8px_24px_rgba(17,18,22,.035)] max-sm:grid-cols-[36px_1fr] max-sm:p-[18px]`}
      >
        <span
          aria-hidden="true"
          className="flex size-10 items-center justify-center rounded-full bg-brand-50 text-lg font-black text-brand max-sm:size-[34px]"
        >
          ✓
        </span>
        <p className="flex flex-col gap-1 text-sm leading-[1.55] text-[#676c75]">
          <strong className="leading-[1.4]">Continue Your Application with Ease</strong>
          <span>
            Information submitted through this website can be used to continue your application
            through the GME app or with assistance from our team, reducing the need to provide the
            same information again.
          </span>
        </p>
      </div>
    </Section>
  );
};

export default HowToApplySection;
