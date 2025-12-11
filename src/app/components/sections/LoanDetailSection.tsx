'use client';
import React from 'react';
import { COMMON_COLORS } from "@/constants/colors";
import { useTranslation } from 'react-i18next';

interface LoanDetail {
  label: string;
  value: string;
  highlight?: boolean;
}

interface LoanDetailSectionProps {
  backgroundImage?: string;
  country: string;
}

export default function LoanDetailSection({ backgroundImage = '/images/default-background.jpg', country }: LoanDetailSectionProps) {
  const { t } = useTranslation()
  const loanDetails: LoanDetail[] = [
    {
      label: t('countryPage.LoanDetailsLabel1'),
      value: t(`countryPage.loanDetails.${country}.value1`)
    },
    {
      label: t('countryPage.LoanDetailsLabel2'),
      value: t(`countryPage.loanDetails.${country}.value2`)
    },
    {
      label: t('countryPage.LoanDetailsLabel3'),
      value: t(`countryPage.loanDetails.${country}.value3`)
    },
    {
      label: t('countryPage.LoanDetailsLabel4'),
      value: t(`countryPage.loanDetails.${country}.value4`),
      highlight: true
    },
    {
      label: t('countryPage.LoanDetailsLabel5'),
      value: t('countryPage.LoanDetailsValue5')
    },
    {
      label: t('countryPage.LoanDetailsLabel6'),
      value: t(`countryPage.loanDetails.${country}.value6`)
    },
    {
      label: t('countryPage.LoanDetailsLabel7'),
      value: t(`countryPage.loanDetails.${country}.value7`)
    },
    {
      label: t('countryPage.LoanDetailsLabel8'),
      value: t('countryPage.LoanDetailsValue8')
    },
    {
      label: t('countryPage.LoanDetailsLabel9'),
      value: t(`countryPage.loanDetails.${country}.value9`)
    }
  ];

  return (
    <section
      className="py-16 px-4 md:px-8 lg:px-40 bg-cover bg-center bg-no-repeat relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundColor: COMMON_COLORS.navyDark
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      <div className="relative z-10 w-full mx-auto">
        <h2 className="text-heading text-center mb-8 md:mb-12 lg:mb-20 text-white drop-shadow-lg">
          {t('countryPage.LoanDetailsTitle')}
        </h2>

        <div className="bg-white/60 rounded-2xl shadow-2xl border border-white/20">
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {loanDetails.map((detail, index) => (
                  <tr
                    key={index}
                    className='border-b border-black/30 last:border-b-0 '
                  >
                    <td className="px-2 md:px-6 text-black font-semibold text-input md:text-base border-r border-black/30 text-center">
                      {detail.label}
                    </td>
                    <td className="py-5 px-2 md:px-6 text-black font-semibold text-input md:text-base text-center">

                      {detail.value}

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}