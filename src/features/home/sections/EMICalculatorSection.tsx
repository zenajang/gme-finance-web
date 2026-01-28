'use client';

import React from 'react';
import { COMMON_COLORS } from '@/constants/colors';
import { useTranslation } from 'react-i18next';

interface EMICalculatorSectionProps {
  buttonBgColor?: string;
  buttonHoverBgColor?: string;
  titleColor?: string;
}

export default function EMICalculatorSection({
  buttonBgColor = COMMON_COLORS.primary,
}: EMICalculatorSectionProps) {
  const openCalculator = () => {
    window.open('https://finance-emical.vercel.app/', '_blank');
  };
  const { t } = useTranslation()

  return (
    <section data-emi-section className="px-4 md:px-8 lg:px-40 pt-16 md:pt-20 relative z-10">
      <div className="relative w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-10 md:p-10 relative overflow-hidden lg:p-15">
          <h2 className="text-lg md:text-4xl lg:text-5xl font-bold text-black text-center mb-4 md:mb-5 lg:mb-10">{t('countryPage.SupportTitle')}</h2>
          <p className={`text-subheading text-center mb-3 md:mb-4 lg:mb-10 lg:mx-110`} >{t('countryPage.SupportSubTitle')}</p>
          <div className="relative z-10 px-0 md:px-12 lg:px-88">
            <button
              onClick={openCalculator}
              style={{ backgroundColor: buttonBgColor, width: '100%' }}
              className="rounded-lg md:rounded-xl text-md md:text-xl lg:text-xl text-white py-2 md:py-6 lg:py-6 font-medium cursor-pointer hover:opacity-90 transition-opacity"
            >
              {t('button.EMICalculator')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
