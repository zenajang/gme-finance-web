'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function MainIntroductionSection() {
  const { t } = useTranslation();
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleReady = () => {
      setIsVideoReady(true);
      video.play().catch(() => {
        // Ignore autoplay rejection on some browsers.
      });
    };

    video.addEventListener('loadeddata', handleReady);
    video.addEventListener('canplay', handleReady);
    if (video.readyState >= 2) {
      handleReady();
    }

    return () => {
      video.removeEventListener('loadeddata', handleReady);
      video.removeEventListener('canplay', handleReady);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-neutral-200">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={`w-full h-full object-cover transition-opacity duration-700 ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src="/images/main_image_autumn.mp4" type="video/mp4" />
          <source src="/images/main_image_autumn.webm" type="video/webm" />
        </video>
      </div>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 w-full px-6 md:px-10 lg:px-60 h-full flex flex-col items-start justify-center text-white pt-16 md:pt-70">
        <div className="w-full max-w-[1400px] mr-auto">
          <h1 className="text-4xl md:text-8xl lg:text-8xl font-bold mb-3 md:mb-7">GME FINANCE</h1>
          <p className="text-md md:text-3xl lg:text-4xl mb-6 md:mb-15">{t('home.mainTitle')}</p>

          <div className="flex flex-wrap items-center gap-2 md:gap-7 mb-3 md:mb-8 text-black">
            <span className="inline-flex items-center gap-2 rounded-lg bg-white/50 px-3 py-1 md:px-6 md:py-2.5 text-[10px] md:text-base backdrop-blur-sm ring-1 ring-white/50">
              <Image src="/images/icons/global.svg" alt="" width={16} height={16} />
              {t('home.heroPills.countries')}
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg bg-white/50 px-3 py-1 md:px-6 md:py-2.5 text-[10px] md:text-base backdrop-blur-sm ring-1 ring-white/50">
              <Image src="/images/icons/secure.svg" alt="" width={16} height={16} />
              {t('home.heroPills.secure')}
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg bg-white/50 px-3 py-1 md:px-6 md:py-2.5 text-[10px] md:text-base backdrop-blur-sm ring-1 ring-white/50">
              <Image src="/images/icons/fast.svg" alt="" width={16} height={16} />
              {t('home.heroPills.fast')}
            </span>
          </div>

          <div className="w-full rounded-2xl bg-white/50 text-slate-900 backdrop-blur-md ring-1 ring-white/50 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.6)]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-20 gap-y-8 px-6 md:px-10 py-6 md:py-10">
              <div className="space-y-1">
                <div className="text-xl md:text-5xl font-bold">{t('home.heroStats.countriesValue')}</div>
                <div className="text-[10px] md:text-base">{t('home.heroStats.countriesLabel')}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl md:text-5xl font-bold">{t('home.heroStats.loanValue')}</div>
                <div className="text-[10px] md:text-base">{t('home.heroStats.loanLabel')}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl md:text-5xl font-bold">{t('home.heroStats.customersValue')}</div>
                <div className="text-[10px] md:text-base">{t('home.heroStats.customersLabel')}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl md:text-5xl font-bold">{t('home.heroStats.supportValue')}</div>
                <div className="text-[10px] md:text-base">{t('home.heroStats.supportLabel')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}
