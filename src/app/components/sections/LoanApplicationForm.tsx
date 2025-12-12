'use client';

import { FormEvent } from "react";
import { COUNTRIES } from "@/constants/countries";
import { COMMON_COLORS } from "@/constants/colors";
import { useTranslation } from "react-i18next";

type LoanApplicationFormProps = {
  subtitleColor?: string;
  buttonBgColor?: string;
  buttonHoverBgColor?: string;
  currency?: string;
  currencySymbol?: string;
  country?: string;
}

export default function LoanApplicationForm({
  subtitleColor = COMMON_COLORS.primary,
  buttonBgColor = COMMON_COLORS.primary,
  country,
}: LoanApplicationFormProps) {

  const { t } = useTranslation();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      nationality: formData.get('nationality'),
    };

    console.log('Form submitted:', data);
    alert(`Form submitted:\nFirst Name: ${data.firstName}\nLast Name: ${data.lastName}\nNationality: ${data.nationality}`);
  };

  return (
    <section className="py-10 md:py-16 lg:py-20 relative z-10">
      <div className="container mx-auto px-4 md:px-30 lg:px-30 max-w-lg">
        <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-15 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.3)]">
          <h2 className="text-lg md:text-4xl lg:text-5xl font-bold text-black text-center mb-4 md:mb-5 lg:mb-10">{t('home.applyLoanAppTitle')}</h2>
          <p className={`text-subheading text-center mb-3 md:mb-4 lg:mb-4`} style={{ color: subtitleColor }}>
            {country ? t(`home.applyLoanAppSubTitleByCountry.${country}`) : t('home.applyLoanAppSubTitle')}
          </p>
          <p className="text-center text-base text-[0.65rem] md:text-lg lg:text-lg text-gray-600 lg:mx-65">
            {t('home.applyLoanAppSubTitle1')}
          </p>
          <form className="space-y-4 px-0 md:px-12 lg:px-15 pt-5 md:pt-16 lg:pt-20 pb-6 md:pb-8 lg:pb-10" onSubmit={handleSubmit}>
            <p className="text-label">{t('name')}
              <span className="font-bold text-red-600">*</span>
            </p>
            <input
              type="text"
              name="firstName"
              placeholder={t('firstName')}
              required
              className="w-full px-2 py-2 md:px-4 md:py-3 lg:px-4 lg:py-3 text-input border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="lastName"
              placeholder={t('lastName')}
              required
              className="w-full px-2 py-2 md:px-4 md:py-3 lg:px-4 lg:py-3 text-input border border-gray-300 rounded-lg"
            />
            <p className="text-label mt-1 md:mt-10 lg:mt-10">{t('nationality')}
              <span className="font-bold text-red-600">*</span>
            </p>
            <select
              name="nationality"
              required
              className="w-full px-2 py-2 md:px-4 md:py-3 lg:px-4 lg:py-3 text-input border border-gray-300 rounded-lg text-gray-500"
            >
              <option value="">{t("nationality")}</option>
              {COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            <div className="text-center mt-0 md:mt-15 lg:mt-15">
              <button style={{
                width: '100%',
                display: 'block',
                backgroundColor: buttonBgColor,
              }} className="rounded-lg text-md md:text-xl lg:text-xl text-white px-18 md:px-40 lg:px-40 py-2 md:py-6 lg:py-6 font-semibold">
                {t("button.continue")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
