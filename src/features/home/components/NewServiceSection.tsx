"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function NewServiceSection() {
  const { t } = useTranslation()
  return (
    <section className="relative bg-[#f9f9f9] pt-10 lg:pt-20 pb-10 lg:pb-20">
      <h2 className="text-xl md:text-5xl lg:text-5xl font-bold text-center mb-5 lg:mb-0">Your Digital Finance Partner </h2>
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row items-center gap-6 md:gap-20">
        {/* Left: App Preview Image */}
        <div className="flex-1 w-full flex justify-center">
          <Image
            src="/images/phone.svg"
            alt="GME App"
            width={430}
            height={800}
            className="object-contain w-[200px] h-[250px] md:w-[430px] md:h-[800px]"
          />
        </div>

        {/* Right: Title & Text */}
        <div className="flex-1">
          <p className="text-sm md:text-md lg:text-xl leading-relaxed mb-4 lg:mb-8 text-center md:text-left font-medium">
            {t('home.newServiceDes1')}<br />
            {t('home.newServiceDes2')}
          </p>
          <p className="text-sm md:text-md lg:text-xl leading-relaxed mb-4 lg:mb-8 text-center md:text-left font-medium">
            {t('home.newServiceDes3')}<br />
            {t('home.newServiceDes4')}
          </p>
          <ul className="space-y-6 text-gray-700 lg:-ml-5">
            <li className="flex items-start gap-4 bg-white rounded-lg p-3 lg:p-6">
              <span className="text-3xl lg:text-5xl font-medium">1</span>
              <p>
                <span className="font-semibold text-sm lg:text-lg">{t('home.newServiceStep1')}</span><br />
                <span className="text-sm lg:text-md">{t('home.newServiceStep1Des')}</span>
              </p>
            </li>

            <li className="flex items-start gap-4 bg-white rounded-lg p-3 lg:p-6">
              <span className="text-3xl lg:text-5xl font-medium">2</span>
              <p>
                <span className="font-semibold text-sm lg:text-lg">{t('home.newServiceStep2')}</span><br />
                <span className="text-sm lg:text-md">{t('home.newServiceStep2Des')}</span>
              </p>
            </li>

            <li className="flex items-start gap-4 bg-white rounded-lg p-3 lg:p-6">
              <span className="text-3xl lg:text-5xl font-medium">3</span>
              <p>
                <span className="font-semibold text-sm lg:text-lg">{t('home.newServiceStep3')}</span><br />
                <span className="text-sm lg:text-md">{t('home.newServiceStep3Des')}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
