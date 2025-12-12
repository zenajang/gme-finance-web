'use client';

import Image from 'next/image';

export default function ScrollingText() {
  const IMAGES_PER_SET = 1;

  const ImageGroup = ({ prefix }: { prefix: string }) => (
    <div className="flex items-center gap-8 md:gap-10 shrink-0">
      {Array.from({ length: IMAGES_PER_SET }).map((_, index) => (
        <Image
          key={`${prefix}-${index}`}
          src="/images/animatedLetter.svg"
          alt="GME Finance Banner"
          width={900}
          height={130}
          className="h-12 md:h-20 lg:h-28 w-auto flex-shrink-0"
        />
      ))}
    </div>
  );

  return (
    <section className="py-5 md:py-10 lg:py-12 bg-white overflow-hidden">
      <div className="relative mb-1 md:mb-4 lg:mb-4">
        <div className="flex items-center gap-8 md:gap-10 animate-marquee-row1">
          <ImageGroup prefix="top-set1" />
          <ImageGroup prefix="top-set2" />
        </div>
      </div>

      <div className="relative mt-5 lg:mt-10">
        <div className="flex items-center gap-8 md:gap-10 animate-marquee-row2">
          <ImageGroup prefix="bottom-set1" />
          <ImageGroup prefix="bottom-set2" />
        </div>
      </div>
    </section>
  );
}