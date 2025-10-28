'use client';

import Image from "next/image";

export default function IntroductionSection() {
  return (
    <section className="relative h-[600px] md:h-[800px] lg:h-[995px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/introduction.jpg"
            alt="Building"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-start justify-end md:justify-start text-white pb-30 md:pt-52">
          <h1 className="text-5xl md:text-7xl lg:text-7xl font-bold mb-4">GME FINANCE</h1>
          <p className="text-md md:text-2xl lg:text-2xl mb-2">모두가 함께 성장할 수 있도록 지원합니다</p>
        </div>
        <div className="absolute inset-x-0 top-12 md:inset-0 z-20 flex items-start md:items-center justify-center text-white pt-30 md:pt-0">
            <h2 className="text-2xl md:text-5xl lg:text-5xl font-bold">소개 글 영상</h2>
        </div>
      </section>

  );
}