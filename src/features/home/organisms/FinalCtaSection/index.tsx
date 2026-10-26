import Image from 'next/image';
import ApplyLoanButton from '@/features/home/atoms/ApplyLoanButton';
import Eyebrow from '@/features/home/atoms/Eyebrow';
import Section from '@/features/home/molecules/Section';

const STORE_BADGES = [
  {
    href: 'https://apps.apple.com/us/app/gme-remit-money-transfer/id1439161261?l=ko',
    src: '/images/home/app-store-badge.png',
    alt: 'Download on the App Store',
    width: 186,
  },
  {
    href: 'https://play.google.com/store/apps/details?id=com.gmeremit.online.gmeremittance_native',
    src: '/images/home/google-play-badge.png',
    alt: 'Get it on Google Play',
    width: 209,
  },
] as const;

const FinalCtaSection = () => {
  return (
    <Section tone="white" paddingClassName="py-[68px] max-lg:py-12">
      <div
        data-reveal
        className="relative mx-auto grid max-w-[1000px] grid-cols-[minmax(0,1.35fr)_minmax(285px,.65fr)] items-center gap-x-[54px] overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white px-11 py-[34px] text-[#17191f] shadow-[0_18px_50px_rgba(17,24,39,.07)] backdrop-blur-[3px] before:absolute before:inset-y-0 before:left-0 before:w-1.5 before:bg-[#df1f26] max-lg:grid-cols-1 max-lg:px-[26px] max-lg:py-8">
        <div>
          <Eyebrow>Get Started</Eyebrow>
          <h2 className="mt-2 mb-2 text-[42px] leading-[1.08] font-bold tracking-[-0.04em] max-lg:text-4xl">
            Apply Loan Now
          </h2>
          <p className="mb-[18px] max-w-[610px] text-[15px] leading-[1.5] text-[#60646c]">
            Talk to GME Finance through Channel Talk to start your loan inquiry.
          </p>
          <ApplyLoanButton />
        </div>
        <div className="flex flex-col justify-center self-stretch border-l border-[#e5e7eb] pl-[30px] max-lg:mt-6 max-lg:border-t max-lg:border-l-0 max-lg:pt-[22px] max-lg:pl-0">
          <p className="mb-3 text-sm leading-[1.2] font-bold">Download the GME App</p>
          <div className="flex items-center gap-2.5">
            {STORE_BADGES.map(({ href, src, alt, width }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex rounded-lg transition duration-[180ms] ease-[ease] hover:-translate-y-0.5 hover:opacity-95"
              >
                <Image src={src} alt={alt} width={width} height={67} className="h-10 w-auto" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default FinalCtaSection;
