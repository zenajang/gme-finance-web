import Button from '@/features/home/atoms/Button';
import Container from '@/features/home/atoms/Container';
import { APPLY_LOAN_URL } from '@/features/home/constants';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex h-[760px] items-center overflow-hidden pb-7 before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(90deg,rgba(255,255,255,.94)_0%,rgba(255,255,255,.86)_42%,rgba(255,255,255,.38)_72%,rgba(255,255,255,.16)_100%)] max-lg:before:bg-[linear-gradient(180deg,rgba(255,255,255,.82)_0%,rgba(255,255,255,.7)_55%,rgba(255,255,255,.55)_100%)] max-xl:h-[680px] max-lg:h-auto max-lg:pt-33 max-lg:pb-16 max-sm:pt-28 max-sm:pb-12"
    >
      <Container className="relative grid grid-cols-[minmax(0,1fr)_minmax(300px,430px)] items-center gap-12 pt-[38px] pb-[22px] max-lg:grid-cols-1 max-lg:gap-[38px]">
        <div className="max-w-[680px]">
          <span className="mb-[22px] inline-flex items-center gap-[9px] text-[12.5px] font-bold tracking-[0.12em] text-brand uppercase before:inline-block before:h-0.5 before:w-5 before:bg-brand">
            GME FINANCE
          </span>
          <h1 className="mt-5 max-w-[650px] text-[clamp(22px,2.25vw,34px)] leading-[1.25] font-semibold tracking-[-0.025em] text-[#17191f]">
            Your trusted partner for foreigner loans in South Korea
          </h1>
          <p className="mt-5 mb-2 text-[clamp(1.35rem,2.2vw,2rem)] font-bold tracking-[-0.025em] text-brand max-[700px]:text-[1.2rem]">
            ₩2,000,000 – ₩30,000,000
          </p>
          <p className="mt-2.5 mb-[34px] max-w-[420px] text-[16.5px] leading-[1.65] text-ink-70">
            For eligible foreign residents.
          </p>
          <div className="mb-7 flex flex-wrap items-center gap-4">
            <Button href={APPLY_LOAN_URL}>Apply Loan</Button>
          </div>
        </div>
        <div className="w-full max-w-[760px] justify-self-center max-lg:justify-self-start">
          <video
            className="block h-auto w-full origin-right object-contain lg:scale-[1.13]"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/images/home/hero.mp4" type="video/mp4" />
          </video>
        </div>
      </Container>
    </section>
  );
}
