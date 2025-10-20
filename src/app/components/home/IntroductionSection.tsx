'use client';

import Image from "next/image";

export default function IntroductionSection() {
  return (
     <section className="relative h-[995px]">
        <div className="absolute inset-0">
          <Image
            src="/images/introduction.jpg"
            alt="Building"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-start justify-start text-white pt-52">
          <h1 className="text-7xl font-bold mb-4">GME FINANCE</h1>
          <p className="text-2xl mb-2">모두가 함께 성장할 수 있도록 지원합니다</p>
        </div>
        <div className="absolute inset-0 z-10 flex items-center justify-center text-white">
            <h2 className="text-5xl font-semibold">소개 글 영상</h2>
        </div>
      </section>

  );
}