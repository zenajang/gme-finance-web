'use client';

import { COMMON_COLORS } from '@/constants/colors';
import Image from 'next/image';
import { useState } from 'react';
import IntroductionSection from '../components/home/IntroductionSection';

export default function CareersPage() {
  const [selectedTestimonial, setSelectedTestimonial] = useState<{
    name: string;
    position: string;
    image: string;
    text: string;
  } | null>(null);
  const testimonials = [
    {
      name: 'Hamid',
      position: 'CIS Marketing Team Leader',
      image: '/images/uzbekistan/team/hamid.jpg',
      text: `지엠이대부에서 금융 마케팅 담당자로 일한 지난 6개월은 매우 보람찬 시간이었습니다. 관리팀은 처음부터 따뜻하게 맞아주고, 필요한 모든 지원을 아끼지 않았습니다. 동료들 또한 항상 협력적이고 격려해 주어 매일 즐겁게 일할 수 있었습니다.

지엠이대부는 한국에서 뛰어난 평판을 자랑하며, 특히 외국인을 위한 빠르고 저금리의 맞춤형 대출 솔루션을 제공합니다.

고객들이 재정 목표를 달성할 수 있도록 돕는 이일에 자부심을 느끼며, 앞으로도 더 큰 기여를 하고 싶습니다.`,
    },
    {
      name: 'Glen',
      position: 'Head of Online Marketing',
      image: '/images/philippines/team/glen.jpg',
      text: `Joining GME Finance was a pivotal moment in my career. From day one, I was impressed by the company's commitment to its employees and its customers. The collaborative and supportive work environment fosters a sense of belonging and encourages professional growth.

One of the aspects I value most about GME Finance is the emphasis on continuous learning. The company provides ample opportunities for training and development, allowing me to expand my skill set and stay up-to-date with industry trends. The mentorship programs have been particularly beneficial, as experienced colleagues have guided me through challenges and offered invaluable advice.

Beyond the professional growth, GME Finance prioritizes work-life balance. Flexible work arrangements and supportive management have allowed me to maintain a healthy equilibrium between my personal and professional life. This has significantly improved my overall job satisfaction and productivity.

Furthermore, I'm proud to be part of a company that is dedicated to making a positive impact on the community. GME Finance's involvement in various social initiatives aligns with my personal values and makes my work even more meaningful.

In conclusion, GME Finance is more than just a workplace; it's a place where I can thrive both personally and professionally. I'm excited to be part of a team that is passionate about delivering exceptional financial solutions and making a difference in the lives of our customers.`,
    },
    {
      name: 'Tabitha',
      position: 'Cambodia Marketing Team Officer',
      image: '/images/cambodia/team/tabitha.jpg',
      text: `As a Head of Cambodia Marketing at GME Finance, I led a team of marketing professionals in developing and executing integrated marketing strategies for our loan products. Our working environment is one where creativity, collaboration, and growth are at the core of everything we do.

As a team, we're driven by a shared vision to make a meaningful impact in the lives of our Cambodian customers, helping them navigate their financial journeys with confidence. We foster a culture of openness and innovation, where every idea is valued, and everyone has the opportunity to contribute to the company's success.

We believe in empowering our team members to take initiative, think strategically, and push boundaries. With a strong focus on professional development, we provide opportunities for growth, encourage continuous learning, and support each individual in reaching their full potential.

Whether you're leading a new campaign, analyzing customer insights, or collaborating across departments, you'll always find ourselves surrounded by motivated colleagues who are just as passionate about delivering results as you are.

Beyond the professional growth, GME Finance prioritizes work-life balance. Flexible work arrangements and supportive management have allowed me to maintain a healthy equilibrium between my personal and professional life. This has significantly improved my overall job satisfaction and productivity.

The work environment is fast-paced yet supportive, where challenges are seen as opportunities for growth and innovation. We celebrate both big wins and small successes, knowing that each step forward contributes to the overall mission of creating better financial solutions for our customers.

Above all, the culture here is one of respect, collaboration, and a shared commitment to excellence – where every team member plays an integral role in shaping the future of our business.`,
    },
  ];

  const perks = [
    {
      title: 'Learning and Development',
      description: 'We empower our team through continuous learning and skill development with diverse training programs, fostering a culture of growth to enhance both individual and organizational success.',
      image: '/images/development.jpg',
    },
    {
      title: 'Empowerment and Recognition',
      description: 'We celebrate our team\'s hard work and dedication through a comprehensive rewards and recognition program that fosters motivation and strengthens our company culture.',
      image: '/images/recognition.jpg',
    },
    {
      title: 'Bonding and Rejuvenation',
      description: 'Recharge and strengthen your team with our curated team-building activities and wellness programs, designed to foster collaboration, boost morale, and promote overall well-being.',
      image: '/images/rejuvenation.jpg',
    },
    {
      title: 'Your Health, Our Priority',
      description: 'We care about your well-being, providing all full-time employees with comprehensive National Health Insurance for regular health check-ups and peace of mind.',
      image: '/images/priority.jpg',
    },
    {
      title: 'Recharge and Refresh',
      description: 'We offer generous annual and bonus leaves to support work-life balance, encouraging you to unwind, recharge, and pursue your passions.',
      image: '/images/refresh.jpg',
    },
  ];

  const values = [
    {
      title: 'Integrity',
      description: 'A GME Finance staff member places honesty and ethics at the forefront of their work.',
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
      title: 'Teamwork',
      description: 'A GME Finance staff member believes in collaboration and thrives in a supportive team environment.',
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
      title: 'Think big, dream bigger',
      description: 'A GME Finance staff member is always striving to achieve great things and push the boundaries of what is possible.',
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
      title: 'Failure',
      description: 'A GME Finance staff member views failure as an opportunity to learn and grow and uses it as a steppingstone to success.',
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
        title={'Be the change'}
        description={'Join Our Financial Mission'}
        buttonText={'See Our Vacancies'}
        buttonHref="https://www.saramin.co.kr/zf_user/company-info/view-inner-recruit?csn=OHdqZkRQSDBYZVd2ckZvN0pEcnZxZz09"
        buttonBgColor={COMMON_COLORS.primary}
        buttonHoverBgColor={COMMON_COLORS.primaryHover}
        buttonTextColor={COMMON_COLORS.white}
      />
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mt-10 md:mt-15">
        Our Values
      </h1>
      <p className="text-md md:text-2xl mt-2 text-gray-600 text-center" style={{ color: COMMON_COLORS.primary }}>
        What it means to be a GME Finance Staff
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
          Perks and Benefits
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
            Employee Spotlights
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
                    Read Full Testimony
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
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
