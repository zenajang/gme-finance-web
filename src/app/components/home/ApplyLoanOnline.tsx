"use client";

import Image from "next/image";

export default function ApplyLoanOnline() {
  return (
    <section className="relative bg-[#f9f9f9] m-20 rounded-2xl pt-20 pb-20 px-70">
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
          <Image
            src="/images/google.svg"
            alt="GME App"
            width={230}
            height={200}
            className="object-contain"
          />
          <Image
            src="/images/apple.svg"
            alt="GME App"
            width={230}
            height={200}
            className="object-contain"
          />
          
        </div>

        {/* Right: Title & Text */}
        <div className="justify-start">
          <p className="text-sm md:text-md lg:text-4xl leading-relaxed mb-4 text-center md:text-left font-bold">
            Step1
          </p>
          <p className="text-sm md:text-md lg:text-2xl leading-relaxed mb-8 text-center md:text-left font-medium">
            Download and install the GME app. <br/>
            Available on Google Play and App Store. <br/>
            Register and submit the necessary requirements.<br/>
            After successful registration, you can now apply for a loan online.<br/>
          </p>
        </div>
      </div>
      <div className="flex justify-end -mt-16">
        <button className="bg-[#DF2121] shadow-[0_0_15px_rgba(0,0,0,0.15)] text-md md:text-[1.35rem] lg:text-[1.35rem] text-white cursor-pointer px-10 md:px-30 lg:px-30 py-2 md:py-4 lg:py-4 font-medium hover:bg-red-500 transition-all">
          Read More
        </button>
      </div>
    </section>
  );
}
