'use client';

import { COMMON_COLORS } from '@/constants/colors';
import Image from 'next/image';
import { useState } from 'react';
import IntroductionSection from '../components/home/IntroductionSection';
import { useTranslation } from 'react-i18next';

export default function CareersPage() {
  const { t } = useTranslation();
  const [selectedTestimonial, setSelectedTestimonial] = useState<{
    name: string;
    position: string;
    image: string;
    text: string;
  } | null>(null);
  const testimonials = [
    {
      name: 'Hamid',
      position: t('careers.testimonials.items.0.position'),
      image: '/images/uzbekistan/team/hamid.jpg',
      text: t('careers.testimonials.items.0.text'),
    },
    {
      name: 'Glen',
      position: t('careers.testimonials.items.1.position'),
      image: '/images/philippines/team/glen.jpg',
      text: t('careers.testimonials.items.1.text'),
    },
    {
      name: 'Tabitha',
      position: t('careers.testimonials.items.2.position'),
      image: '/images/cambodia/team/tabitha.jpg',
      text: t('careers.testimonials.items.2.text'),
    },
  ];

  const perks = [
    {
      title: t('careers.perks.items.0.title'),
      description: t('careers.perks.items.0.description'),
      image: '/images/development.jpg',
    },
    {
      title: t('careers.perks.items.1.title'),
      description: t('careers.perks.items.1.description'),
      image: '/images/recognition.jpg',
    },
    {
      title: t('careers.perks.items.2.title'),
      description: t('careers.perks.items.2.description'),
      image: '/images/rejuvenation.jpg',
    },
    {
      title: t('careers.perks.items.3.title'),
      description: t('careers.perks.items.3.description'),
      image: '/images/priority.jpg',
    },
    {
      title: t('careers.perks.items.4.title'),
      description: t('careers.perks.items.4.description'),
      image: '/images/refresh.jpg',
    },
  ];

  const values = [
    {
      title: t('careers.values.items.0.title'),
      description: t('careers.values.items.0.description'),
      icon: (
        <Image
          src="/images/icons/integrity.svg"
          alt="integrity"
          width={200}
          height={200}
          className="object-contain w-[25px] md:w-[120px]"
        />
      ),
    },
    {
      title: t('careers.values.items.1.title'),
      description: t('careers.values.items.1.description'),
      icon: (
        <Image
          src="/images/icons/team_work.svg"
          alt="teamwork"
          width={200}
          height={200}
          className="object-contain w-[25px] md:w-[110px]"
        />
      ),
    },
    {
      title: t('careers.values.items.2.title'),
      description: t('careers.values.items.2.description'),
      icon: (
        <Image
          src="/images/icons/think.svg"
          alt="think"
          width={300}
          height={300}
          className="object-contain w-[25px] md:w-[130px]"
        />
      ),
    },
    {
      title: t('careers.values.items.3.title'),
      description: t('careers.values.items.3.description'),
      icon: (
        <Image
          src="/images/icons/failure.svg"
          alt="failure"
          width={200}
          height={200}
          className="object-contain w-[25px] md:w-[100px]"
        />
      ),
    },
  ];

  return (
    <div>
      <IntroductionSection
        videoSrc="/images/career.webm"
        title={t('careers.hero.title')}
        description={t('careers.hero.subtitle')}
        buttonText={t('careers.hero.cta')}
        buttonHref="https://www.saramin.co.kr/zf_user/company-info/view-inner-recruit?csn=OHdqZkRQSDBYZVd2ckZvN0pEcnZxZz09"
        buttonBgColor={COMMON_COLORS.primary}
        buttonHoverBgColor={COMMON_COLORS.primaryHover}
        buttonTextColor={COMMON_COLORS.white}
      />
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mt-10 md:mt-15">
        {t('careers.values.title')}
      </h1>
      <p className="text-md md:text-2xl mt-2 text-gray-600 text-center" style={{ color: COMMON_COLORS.primary }}>
        {t('careers.values.subtitle')}
      </p>


      {/* Values Section - 4 petals in clover pattern */}
      <div className="flex justify-center items-center py-10 md:py-8 px-4">
        <div className="relative w-[310px] h-[310px] md:w-[940px] md:h-[940px]">
          {values.map((value, index) => {
            // Position and border-radius for each petal
            const petalStyles = [
              { top: '0', left: '0', borderRadius: '100% 100% 0 100%' },
              { top: '0', right: '0', borderRadius: '100% 100% 100% 0' },
              { bottom: '0', left: '0', borderRadius: '100% 0 100% 100%' },
              { bottom: '0', right: '0', borderRadius: '0 100% 100% 100%' },
            ];

            const iconPositions = [
              'bottom-3 right-3 md:bottom-10 md:right-10',
              'bottom-3 left-3 md:bottom-10 md:left-10',
              'top-3 right-3 md:top-10 md:right-10',
              'top-3 left-3 md:top-10 md:left-10',
            ];

            const isTopRow = index < 2;
            const justifyClass = isTopRow ? 'justify-start pt-8 md:pt-35' : 'justify-end pb-6 md:pb-35';
            const titleClass = 'text-xs md:text-3xl font-bold leading-tight mb-1 md:mb-2';
            const contentClass = 'text-center px-3 md:px-10';

            return (
              <div
                key={index}
                className={`absolute w-[152px] h-[152px] md:w-[460px] md:h-[460px] text-white flex flex-col items-center ${justifyClass}`}
                style={{
                  backgroundColor: COMMON_COLORS.primary,
                  ...petalStyles[index],
                }}
              >
                <div className={contentClass}>
                  <h3 className={titleClass}>
                    {value.title}
                  </h3>
                  <p className="text-[8px] md:text-lg leading-tight md:leading-normal">
                    {value.description}
                  </p>
                </div>
                <div className={`absolute ${iconPositions[index]}`}>
                  {value.icon}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Perks and Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-20">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 md:mb-16">
          {t('careers.perks.title')}
        </h2>

        <div>
          {perks.map((perk, index) => {
            const isEven = index % 2 === 0;
            const isFirst = index === 0;
            const isLast = index === perks.length - 1;
            const textDesktopCorners = isEven
              ? `${isFirst ? 'md:rounded-tl-lg' : ''} ${isLast ? 'md:rounded-bl-lg' : ''}`
              : `${isFirst ? 'md:rounded-tr-lg' : ''} ${isLast ? 'md:rounded-br-lg' : ''}`;
            const imageDesktopCorners = isEven
              ? `${isFirst ? 'md:rounded-tr-lg' : ''} ${isLast ? 'md:rounded-br-lg' : ''}`
              : `${isFirst ? 'md:rounded-tl-lg' : ''} ${isLast ? 'md:rounded-bl-lg' : ''}`;

            return (
              <div
                key={index}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-stretch`}
              >
                {/* 텍스트 */}
                <div
                  className={`flex-1 bg-[#F9F9F9] ${isFirst ? 'rounded-t-lg' : ''} ${textDesktopCorners}`}
                >
                  <h3 className="text-lg md:text-3xl font-bold mb-2 md:mb-4 px-6 md:px-0 md:pl-10 pt-6 md:pt-10 text-center md:text-left">{perk.title}</h3>
                  <p className="text-sm md:text-lg text-[#2B2B2B] leading-relaxed px-6 md:px-10 md:pl-10 pb-6 md:pb-0 text-center md:text-left">
                    {perk.description}
                  </p>
                </div>

                {/* 이미지 */}
                <div className="flex-1 w-full">
                  <div
                    className={`relative w-full aspect-[5/3] overflow-hidden ${isLast ? 'rounded-b-lg' : ''} ${imageDesktopCorners}`}
                  >
                    <Image
                      src={perk.image}
                      alt={perk.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 md:py-24" style={{ background: 'linear-gradient(to bottom, #FFFFFF 0%, #FDF0F0 50%, #FADEDE 100%)' }}>
        <div className="max-w-8xl mx-auto px-6 md:px-40">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 md:mb-16">
            {t('careers.testimonials.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Profile Image with accent ring */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 md:w-58 md:h-58 rounded-full overflow-hidden border-4 border-white"
                      style={{ boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15), 0 4px 15px rgba(0, 0, 0, 0.1)' }}
                    >
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={110}
                        height={110}
                        className="object-cover object-top w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Name & Position */}
                <div className="text-center mb-4">
                  <h3 className="text-lg md:text-2xl font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-md text-gray-800">{testimonial.position}</p>
                </div>

                {/* Testimonial Text */}
                <div className="relative h-[100px] md:h-[230px] overflow-hidden mb-6 pl-10 pr-10">
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed text-center">
                    {testimonial.text}
                  </p>
                  {/* Fade out gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-10 md:h-25 bg-gradient-to-t from-white via-white/70 to-transparent" />
                </div>
                {/* Read Full Testimony Button */}
                <div className="text-center">
                  <button
                    className="px-6 py-2 md:text-lg font-medium text-white rounded-full transition-colors hover:opacity-90 mt-5"
                    style={{ backgroundColor: COMMON_COLORS.primary }}
                    onClick={() => setSelectedTestimonial(testimonial)}
                  >
                    {t('careers.testimonials.readFull')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Modal */}
      {selectedTestimonial && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTestimonial(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedTestimonial(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-red-500 hover:text-red-600 transition-colors text-2xl font-bold"
            >
              ✕
            </button>

            {/* Profile Image & Name */}
            <div className="flex items-center gap-4 md:gap-6 mb-6">
              <div
                className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden flex-shrink-0"
                style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}
              >
                <Image
                  src={selectedTestimonial.image}
                  alt={selectedTestimonial.name}
                  width={112}
                  height={112}
                  className="object-cover object-top w-full h-full"
                />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">{selectedTestimonial.name}</h3>
                <p className="text-sm md:text-base text-gray-600">{selectedTestimonial.position}</p>
              </div>
            </div>

            {/* Full Testimonial Text */}
            <div className="mb-8">
              <p className="text-sm md:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedTestimonial.text}
              </p>
            </div>

            {/* Close Button */}
            <div className="flex justify-center">
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="px-10 py-2 text-white rounded-full transition-colors hover:opacity-90"
                style={{ backgroundColor: COMMON_COLORS.primary }}
              >
                {t('careers.testimonials.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
