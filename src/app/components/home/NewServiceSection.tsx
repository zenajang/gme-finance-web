"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function NewServiceSection() {
  const { t } = useTranslation()
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
          <p className="text-sm md:text-md lg:text-xl leading-relaxed mb-8 text-center md:text-left font-medium">
            {t('home.newServiceDes1')}<br />
            {t('home.newServiceDes2')}
          </p>
          <p className="text-sm md:text-md lg:text-xl leading-relaxed mb-8 text-center md:text-left font-medium">
            {t('home.newServiceDes3')}<br />
            {t('home.newServiceDes4')}
          </p>
          <ul className="space-y-6 text-gray-700 -ml-5">
            <li className="flex items-start gap-4 bg-white rounded-lg p-6">
              <span className="text-5xl font-medium">1</span>
              <p>
                <span className="font-semibold">{t('home.newServiceStep1')}</span><br />
                {t('home.newServiceStep1Des')}
              </p>
            </li>

            <li className="flex items-start gap-4 bg-white rounded-lg p-6">
              <span className="text-5xl font-medium">2</span>
              <p>
                <span className="font-semibold">{t('home.newServiceStep2')}</span><br />
                {t('home.newServiceStep2Des')}
              </p>
            </li>

            <li className="flex items-start gap-4 bg-white rounded-lg p-6">
              <span className="text-5xl font-medium">3</span>
              <p>
                <span className="font-semibold">{t('home.newServiceStep3')}</span><br />
                {t('home.newServiceStep3Des')}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
