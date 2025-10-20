'use client';

import Image from 'next/image';
import Link from 'next/link';

type NewsItem = {
  id: string;
  date: string;
  content: string;
  video: string;
  name: string;
  career: string;
};

const NEWS: NewsItem[] = [
  {
    id: 'gme-cricket-2025',
    date: '2025-06-27',
    content: "GME Finance was a lifesaver! Their team provided exceptional support and guidance as I navigated the loan process. The application was easy, the rates were competitive, and they quickly approved my loan. I can't recommend them enough for anyone seeking reliable financial assistance",
    video: '/images/introduction.jpg',
    career: 'Factory Worker',
    name: 'Chanta',
  },
  {
    id: 'anniv-gift',
    date: '2025-06-27',
    content: 'Thanks to GME Finance, a huge weight has been lifted off my financial burden. Their loan services were incredibly fast and affordable. Their terms and conditions were also very friendly! I am grateful to GME Finance for providing me with a solution during my time of need.',
    video: '/images/introduction.jpg',
    career: 'Factory Worker',
    name:'M.Agus'
  },
  {
    id: 'raffle-draw',
    date: '2025-06-27',
    content: 'GME Finance has been a game-changer for my finances. Their loans are not only fast and convenient but also perfectly suited to my needs. I was impressed by their speedy approval and customizable repayment plans. GME Finance truly puts their customers first, and their service is top-notch. I wholeheartedly recommend them to anyone seeking financial support.',
    video: '/images/introduction.jpg',
    career: 'Factory Worker',
    name :'Lolita Gomonid'
  },
];

function formatDate(d: string) {
  const dt = new Date(d);
  return `${dt.getFullYear()}.${String(dt.getMonth() + 1).padStart(2, '0')}.${String(dt.getDate()).padStart(2, '0')}`;
}

export default function CustomerFeedbackSection() {
  return (
    <section className="py-20 px-45 bg-white bg-cover bg-center bg-no-repeat relative overflow-hidden">
      <div className="absolute top-0 right-0 w-140 h-55 bg-[#D1100F] rounded-full -mr-52 -mt-0 opacity-50 rotate-45" />
      <div className="absolute top-55 right-0 w-180 h-55 bg-[#EC3322] rounded-full -mr-75 -mt-0 rotate-45" />
      <div className="absolute bottom-40 left-10 w-[500px] h-55 bg-[#FF441C] rounded-full -ml-38 -mb-20 opacity-50 -rotate-145" />
      <div className="absolute bottom-90 left-0 w-[700px] h-55 bg-[#EC3322] rounded-full -ml-68 -mb-16 -rotate-145" />
      <div className="px-3 relative z-10">
        <h2 className="text-5xl font-bold text-black text-center">Customer Feedback</h2>

        <div className="grid md:grid-cols-3 gap-8 mt-8 py-8">
          {NEWS.map((item) => (
            <article
              key={item.id}
              className="
                rounded-3xl bg-white
                flex flex-col
                min-h-[560px] md:min-h-[600px]
                shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] overflow-hidden
              "
            >
              <div className="p-8 flex flex-col flex-1">
                <header className="flex items-end justify-between mb-3">
                  <div className="flex items-end gap-2">
                   <Image src="/images/thumb.png" alt="Speaker" width={30} height={30} />
                    <p className="text-[1.1em] leading-none">{item.name}</p>
                    <p className="text-sm text-gray-500 leading-none">{item.career}</p>
                  </div>
                  <div className="text-sm text-gray-500 leading-none">
                    {formatDate(item.date)}
                  </div>
                </header>

                {/* 제목 */}
                <p className="leading-snug line-clamp-8 mb-3">
                  {item.content}
                </p>
              </div>
                  <video className="relative w-full h-1/2" controls>
                    <source src="/testimonial.mp4" type="video/mp4" />
                  </video>
            </article>
          ))}
        </div>

        <div className="text-center mt-15">
          <button className="bg-white border-1 border-red-500 text-[1.35rem] text-red-500 rounded-full cursor-pointer px-40 py-6 font-medium hover:bg-red-50 transition-colors">
            See More
          </button>
        </div>
      </div>
    </section>
  );
}
