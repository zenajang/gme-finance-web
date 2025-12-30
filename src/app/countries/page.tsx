"use client";

import Image from "next/image";
import { COUNTRIES } from "@/constants/countries";
import { useRouter } from "next/navigation";

export default function CountriesPage() {
  const router = useRouter();

  const formatName = (name: string) =>
    name === "SriLanka" ? "Sri Lanka" : name;

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #fffefe 0%, #fff6f6 25%, #ffeded 55%, #ffe4e4 100%)",
          }}
        />
        <div className="pointer-events-none absolute bottom-[-290px] right-[-400px] opacity-60">
          <Image
            src="/images/full_earth.svg"
            alt="Earth background"
            width={1400}
            height={1400}
            priority={false}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 pb-16">
          <h1 className="pt-15 pb-5 md:pb-10 text-center text-3xl md:text-4xl font-bold text-neutral-800 mt-10 md:mt-20">
            Countries
          </h1>

          <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
            {COUNTRIES.map((c) => (
              <button
                key={c.code}
                onClick={() => router.push(`/${c.name.toLowerCase()}`)}
                className="group flex flex-col items-center"
              >
                <div className="relative h-[90px] w-[90px] md:h-[120px] md:w-[120px]">
                  <div className="absolute inset-0 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.08)] ring-1 ring-black/5 transition-transform group-hover:scale-[1.05]" />
                  <Image
                    src={c.flag}
                    alt={`${formatName(c.name)} flag`}
                    fill
                    sizes="92px"
                    className="object-cover"
                  />
                </div>

                <p className="mt-3 text-md md:text-xl font-bold text-neutral-800">
                  {formatName(c.name)}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
