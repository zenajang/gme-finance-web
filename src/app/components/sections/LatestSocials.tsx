'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { COMMON_COLORS } from '@/constants/colors';

export type SocialsItem = {
  id?: string;
  image: string;
  snsLogo: string;
  title: string;
  likes: string;
  followers: string;
  tags: string[];
  href?: string;
};

interface LatestSocialsProps {
  socials: SocialsItem[];
  buttonBgColor?: string;
  buttonHoverBgColor?: string;
  titleColor?: string;
}

export default function LatestSocials({
  socials,
  buttonBgColor = COMMON_COLORS.primary,
  buttonHoverBgColor = COMMON_COLORS.primaryHover,
  titleColor = COMMON_COLORS.black,
}: LatestSocialsProps) {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-16 px-45 ">
      <div className="px-3 relative z-10">
        <h2 className="text-5xl font-bold text-center mb-20" style={{ color: titleColor }}>Latest Socials</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {socials.map((item) => (
            <article
              key={item.id}
              className="
                rounded-3xl bg-white
                flex flex-col
                min-h-[560px] md:min-h-[600px]
                shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] overflow-hidden
              "
            >
              <div className="relative w-full h-1/2">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                  priority={false}
                />
              </div>
              <div className="p-8 flex flex-col flex-1">

                <header className="mb-3 flex items-start gap-4">
                    <Image src={item.snsLogo} alt="Speaker" width={60} height={60} />
                    <div className="flex-1 mt-2">
                    <div className="flex items-center gap-2">
                        <h3 className="text-[1.4rem] leading-snug line-clamp-3 mb-2 font-medium">
                            {item.title}
                        </h3>
                    </div>
                    <div className="flex items-center gap-5">
                      <p className="text-md text-gray-500 mt-0.5">{item.likes} likes </p>
                      <p className="text-md text-gray-500 mt-0.5">{item.followers} followers</p>
                    </div>
                   <span
                        className="left-3 top-3 inline-flex items-centerpx-8 text-[1rem] text-gray-500">
                        {item.tags.map((tag, index) => (
                        <span className='mr-2' key={index}>#{tag}</span>
                        ))}
                    </span>
                    </div>
                </header>

                <div className="mt-auto px-30">
                  <button
                    onClick={() => {
                      if (item.href) {
                        router.push(item.href);
                      }
                    }}
                    className="text-[1.4rem] text-white rounded-full cursor-pointer py-2 font-medium transition-colors w-full"
                    style={{
                      backgroundColor: hoveredId === item.id ? buttonHoverBgColor : buttonBgColor
                    }}
                    onMouseEnter={() => setHoveredId(item.id ?? null)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    Visit
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
