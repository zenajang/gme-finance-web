'use client';

import Image from 'next/image';

type NewsItem = {
  id: string;
  tags: string[];
  date: string;
  title: string;
  image: string;
  href?: string;
};

const NEWS: NewsItem[] = [
  {
    id: 'gme-cricket-2025',
    tags: ['News', 'Collaboration', 'Restaurant'],
    date: '2025-06-27',
    title: 'GME Finance is collaborating with the Warcop restaurant in Ansan',
    image: '/images/introduction.jpg',
    href: '/news/gme',
  },
  {
    id: 'anniv-gift',
    tags: ['Event', 'Anniversary', 'Gift'],
    date: '2025-06-27',
    title: 'GME Finance 6th Anniversary Gift Event',
    image: '/images/introduction.jpg',
    href: '/news/anniv-gift',
  },
  {
    id: 'raffle-draw',
    tags: ['Event', 'Anniversary', 'Travel'],
    date: '2025-06-27',
    title: 'GME Finance 6th Anniversary Travel Raffle Draw Event',
    image: '/images/introduction.jpg',
    href: '/news/raffle-draw',
  },
];

function formatDate(d: string) {
  const dt = new Date(d);
  return `${dt.getFullYear()}.${String(dt.getMonth() + 1).padStart(2, '0')}.${String(dt.getDate()).padStart(2, '0')}`;
}

export default function LatestNewsSection() {
  return (
    <section
      className="py-16 px-45 bg-white bg-cover bg-center bg-no-repeat relative"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/latestNew_bg.png)',
          transform: 'rotate(180deg)'
        }}
      />
      <div className="px-3 relative z-10">
        <h2 className="text-5xl font-bold text-white text-center">Latest News</h2>

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {NEWS.map((item) => (
            <article
              key={item.id}
              className="
                border-4 border-red-500 rounded-3xl bg-white
                flex flex-col
                min-h-[560px] md:min-h-[600px]
                shadow-sm overflow-hidden
              "
            >
              <div className="p-8 flex flex-col flex-1">
                <header className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-2">
                    <Image src="/images/speaker.png" alt="Speaker" width={25} height={25} />
                    <div className="flex items-center gap-2">
                      <p className="text-[1.1em]">{item.tags[0]}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{formatDate(item.date)}</p>
                    </div>
                  </div>
                  <button className="text-gray-500 hover:text-gray-700" aria-label="more">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <circle cx="10" cy="4" r="1.5" />
                      <circle cx="10" cy="10" r="1.5" />
                      <circle cx="10" cy="16" r="1.5" />
                    </svg>
                  </button>
                </header>

                {/* 제목 */}
                <h3 className="text-[1.85rem] leading-snug line-clamp-3 mb-3 font-medium">
                  {item.title}
                </h3>
                 
              </div>
              <div className="px-8 py-1 flex flex-wrap gap-2 text-[1rem] text-gray-500">
                {item.tags.map((tag, index) => (
                  <span key={index}>#{tag}</span>
                ))}
              </div>
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
            </article>
          ))}
        </div>

        <div className="text-center mt-15">
          <button className="bg-white border-2 border-red-500 text-[1.35rem] text-red-500 rounded-full cursor-pointer px-40 py-6 font-medium hover:bg-red-50 transition-colors">
            See More
          </button>
        </div>
      </div>
    </section>
  );
}
