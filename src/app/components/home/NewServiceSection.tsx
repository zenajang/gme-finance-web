"use client";

import Image from "next/image";

export default function NewServiceSection() {
  return (
    <section className="relative bg-[#f9f9f9] pt-20 pb-20">
      <h2 className="text-xl md:text-5xl lg:text-5xl font-bold text-center mb-20">GME App New Services</h2>
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Left: App Preview Image */}
        <div className="flex-1 w-full flex justify-center">
          <Image
            src="/images/phone.svg"
            alt="GME App"
            width={430}
            height={800}
            className="object-contain"
          />
        </div>

        {/* Right: Title & Text */}
        <div className="flex-1">
          <p className="text-sm md:text-md lg:text-lg leading-relaxed mb-8 text-center md:text-left font-medium">
            Experience the future of foreigner loans:<br />
            Apply with ease using GME Finance.
          </p>
          <p className="text-sm md:text-md lg:text-lg leading-relaxed mb-8 text-center md:text-left font-medium">
            Now, you can apply for a foreigner loan in<br />
            just minutes through our GME Application.
          </p>

          <ul className="space-y-6 text-gray-700 -ml-6">
            <li className="flex items-start gap-4 bg-white rounded-lg p-6">
              <span className="text-5xl font-medium">1</span>
              <p>
                Apply your loan online<br />
                Get started in minutes – Apply for your loan online today!
              </p>
            </li>

            <li className="flex items-start gap-4 bg-white rounded-lg p-6">
              <span className="text-5xl font-medium">2</span>
              <p>
                Real time loan processing status checking<br />
                Track your loan progress like never before
              </p>
            </li>

            <li className="flex items-start gap-4 bg-white rounded-lg p-6">
              <span className="text-5xl font-medium">3</span>
              <p>
                Real time loan balance checking<br />
                Simplify your loan experience. Get transparent & convenient access to your information
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
