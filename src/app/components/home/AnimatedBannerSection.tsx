'use client';

export default function ScrollingText() {
  const REPEAT_COUNT = 50;

  const RepeatText = () => (
    <>
      <span className="text-5xl md:text-9xl font-black text-red-600 outline-text px-4">
        GME FINANCE
      </span>
      <span className="text-5xl md:text-9xl font-black text-red-600 px-4">
        FAST EASY AND SAFE
      </span>
    </>
  );

  return (
    <section className="py-10 bg-white overflow-hidden">
      <div className="relative mb-1 md:mb-4 lg:mb-4">
        <div className="flex animate-scroll-left whitespace-nowrap">
          {Array.from({ length: REPEAT_COUNT }).map((_, index) => (
            <RepeatText key={`top-${index}`} />
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="flex animate-scroll-right whitespace-nowrap">
          {Array.from({ length: REPEAT_COUNT }).map((_, index) => (
            <RepeatText key={`bottom-${index}`} />
          ))}
        </div>
      </div>
    </section>
  );
}