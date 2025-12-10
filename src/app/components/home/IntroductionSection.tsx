'use client';

import { useTranslation } from 'react-i18next';

export default function IntroductionSection() {
  const { t } = useTranslation();

  return (
    <section className="relative h-[630px] md:h-[800px] lg:h-[995px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <video
          src="/images/main_image_autumn.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-start justify-end md:justify-start text-white pb-30 md:pt-52">
        <h1 className="text-5xl md:text-7xl lg:text-7xl font-bold mb-4">GME FINANCE</h1>
        <p className="text-md md:text-2xl lg:text-4xl mb-2">{t('home.mainTitle')}</p>
      </div>
    </section>

  );
}