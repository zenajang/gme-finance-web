"use client";

import Image from "next/image";
import Link from "next/link";

export default function ApplyLoanOnline() {
  const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.gmeremit.online.gmeremittance_native";
  const APP_STORE_URL = "https://apps.apple.com/us/app/gme-remit/id1439161261";
  const READ_MORE_URL = "https://gmefinance.com/onlineloan/";

  return (
    <section className="relative bg-[#f9f9f9] m-4 md:m-20 rounded-2xl pt-10 md:pt-20 pb-10 md:pb-20 px-4 md:px-70 overflow-hidden">
      <h2 className="text-xl md:text-5xl lg:text-5xl font-bold text-center mb-20">How to Apply Loan Online? </h2>
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row items-start gap-12 md:gap-20">
        {/* Left: App Preview Image */}
        <div className="justify-center flex-column space-y-4">
          <Image
            src="/images/gme-logo-square.svg"
            alt="GME App"
            width={230}
            height={200}
            className="object-contain"
          />
          <Link href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/google.svg"
              alt="Google Play"
              width={230}
              height={200}
              className="object-contain cursor-pointer hover:opacity-80 transition-opacity mb-4"
            />
          </Link>
          <Link href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/apple.svg"
              alt="App Store"
              width={230}
              height={200}
              className="object-contain cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>

        {/* Right: Title & Text */}
        <div className="justify-start">
          <p className="text-sm md:text-md lg:text-4xl leading-relaxed mb-4 text-center md:text-left font-bold">
            Step1
          </p>
          <p className="text-sm md:text-md lg:text-2xl leading-relaxed mb-8 text-center md:text-left font-medium">
            Download and install the GME app. <br />
            Available on Google Play and App Store. <br />
            Register and submit the necessary requirements.<br />
            After successful registration, you can now apply for a loan online.<br />
          </p>
        </div>
      </div>
      <div className="flex justify-end -mt-16">
        <Link href={READ_MORE_URL} target="_blank" rel="noopener noreferrer">
          <button className="bg-[#DF2121] shadow-[0_0_15px_rgba(0,0,0,0.15)] text-md md:text-[1.35rem] lg:text-[1.35rem] text-white cursor-pointer px-10 md:px-30 lg:px-30 py-2 md:py-4 lg:py-4 font-medium hover:bg-red-500 transition-all">
            Read More
          </button>
        </Link>
      </div>
    </section>
  );
}
