'use client';

import { FormEvent, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { NATIONALITIES, COUNTRY_VISA_TYPES } from "@/constants/countries";
import { COMMON_COLORS } from "@/constants/colors";
import { useTranslation } from "react-i18next";

type LoanApplicationFormProps = {
  subtitleColor?: string;
  buttonBgColor?: string;
  buttonHoverBgColor?: string;
  currency?: string;
  currencySymbol?: string;
  country?: string;
  anchorId?: string;
}

export default function LoanApplicationForm({
  subtitleColor = COMMON_COLORS.primary,
  buttonBgColor = COMMON_COLORS.primary,
  country,
  anchorId,
}: LoanApplicationFormProps) {

  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisaOpen, setIsVisaOpen] = useState(false);
  const [selectedNationality, setSelectedNationality] = useState("");
  const [selectedVisa, setSelectedVisa] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [step, setStep] = useState(1);

  // 전화번호 포맷팅 (010-1234-5678)
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const visaDropdownRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (visaDropdownRef.current && !visaDropdownRef.current.contains(event.target as Node)) {
        setIsVisaOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 성공 메시지 4초 후 자동 숨김
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // 모달 열릴 때 body 스크롤 잠금
  useEffect(() => {
    if (isPrivacyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPrivacyModalOpen]);

  const handleContinue = () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');

    if (!firstName || !lastName || !selectedNationality || !selectedVisa) {
      alert(t('pleaseAllFields') || 'Please fill in all fields');
      return;
    }

    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setSubmitStatus('idle');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step === 1) {
      handleContinue();
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      nationality: selectedNationality,
      visaType: selectedVisa,
      email: formData.get('email'),
      phoneNumber: formData.get('phoneNumber'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // 폼 초기화
        formRef.current?.reset();
        setSelectedNationality('');
        setSelectedVisa('');
        setPhoneNumber('');
        setAgreedToPrivacy(false);
        setStep(1);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const anchorClass = anchorId ? "scroll-mt-16 md:scroll-mt-24" : "";

  const formSection = (
    <section
      id={anchorId}
      data-apply-form
      className={`${anchorClass} py-3 py-10 md:py-20 lg:py-80 relative z-10`}
    >
      <div className="container mx-auto px-4 md:px-30 lg:px-20 max-w-lg">
        <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-15 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.3)]">
          <h2 className="text-lg md:text-4xl lg:text-5xl font-bold text-black text-center mb-4 md:mb-5 lg:mb-10">{t('home.applyLoanAppTitle')}</h2>
          <p className={`text-subheading text-center mb-3 md:mb-4 lg:mb-4`} style={{ color: subtitleColor }}>
            {country ? t(`home.applyLoanAppSubTitleByCountry.${country}`) : t('home.applyLoanAppSubTitle')}
          </p>
          <p className="text-center text-base text-[0.65rem] md:text-lg lg:text-lg text-gray-600 lg:mx-45">
            {t('home.applyLoanAppSubTitle1')}
          </p>

          {/* 성공 메시지 */}
          {submitStatus === 'success' && (
            <div className="mt-4 p-4 bg-orange-100 border border-orange-400 text-orange-700 rounded-lg text-center animate-fade-in relative overflow-hidden">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{t('contactSuccess') || 'Your inquiry has been submitted successfully. We will contact you soon.'}</span>
              </div>
              {/* 프로그레스 바 */}
              <div className="absolute bottom-0 left-0 h-1 bg-orange-500 animate-progress-bar" />
            </div>
          )}

          {/* 에러 메시지 */}
          {submitStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
              {t('contactError') || 'Failed to submit. Please try again.'}
            </div>
          )}

          <form ref={formRef} className="space-y-4 px-0 md:px-12 lg:px-15 pt-5 md:pt-16 lg:pt-20 pb-6 md:pb-8 lg:pb-10" onSubmit={handleSubmit}>

            {/* Step 1: 이름 & 국적 */}
            {step === 1 && (
              <>
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
                <input type="hidden" name="nationality" value={selectedNationality} required />
                <div ref={dropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-2 py-2 md:px-4 md:py-3 lg:px-4 lg:py-3 text-input border border-gray-300 rounded-lg text-left flex justify-between items-center hover:border-gray-400 transition-colors"
                  >
                    <span className={selectedNationality ? "text-black" : "text-gray-500"}>
                      {selectedNationality
                        ? NATIONALITIES.find(c => c.code === selectedNationality)?.name
                        : t("nationality")}
                    </span>
                    <svg className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isOpen && (
                    <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {NATIONALITIES.map((country) => (
                        <li
                          key={country.code}
                          onClick={() => {
                            setSelectedNationality(country.code);
                            setSelectedVisa("");
                            setIsOpen(false);
                          }}
                          className="px-4 py-2 text-black cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                          {country.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* 비자 타입 선택 - 국적 선택 후 표시 */}
                {selectedNationality && COUNTRY_VISA_TYPES[selectedNationality] && (
                  <>
                    <p className="text-label mt-1 md:mt-10 lg:mt-10">{t('visaType') || 'Visa Type'}
                      <span className="font-bold text-red-600">*</span>
                    </p>
                    <input type="hidden" name="visaType" value={selectedVisa} required />
                    <div ref={visaDropdownRef} className="relative">
                      <button
                        type="button"
                        onClick={() => setIsVisaOpen(!isVisaOpen)}
                        className="w-full px-2 py-2 md:px-4 md:py-3 lg:px-4 lg:py-3 text-input border border-gray-300 rounded-lg text-left flex justify-between items-center hover:border-gray-400 transition-colors"
                      >
                        <span className={selectedVisa ? "text-black" : "text-gray-500"}>
                          {selectedVisa || (t("selectVisaType") || "Select Visa Type")}
                        </span>
                        <svg className={`w-4 h-4 text-gray-500 transition-transform ${isVisaOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isVisaOpen && (
                        <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {COUNTRY_VISA_TYPES[selectedNationality].map((visa) => (
                            <li
                              key={visa}
                              onClick={() => {
                                setSelectedVisa(visa);
                                setIsVisaOpen(false);
                              }}
                              className="px-4 py-2 text-black cursor-pointer hover:bg-gray-100 transition-colors"
                            >
                              {visa}
                            </li>
                          ))}
                          <li
                            onClick={() => {
                              setSelectedVisa("Other");
                              setIsVisaOpen(false);
                            }}
                            className="px-4 py-2 text-black cursor-pointer hover:bg-gray-100 transition-colors border-t border-gray-200"
                          >
                            {t('other') || 'Other'}
                          </li>
                        </ul>
                      )}
                    </div>
                  </>
                )}
              </>
            )}

            {/* Step 2: 이메일 & 메시지 */}
            {step === 2 && (
              <>
                {/* 입력된 정보 요약 카드 */}
                <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{t('name')}</p>
                      <p className="text-sm font-semibold text-gray-800">{formRef.current?.firstName?.value} {formRef.current?.lastName?.value}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{t('nationality')}</p>
                      <p className="text-sm font-semibold text-gray-800">{NATIONALITIES.find(c => c.code === selectedNationality)?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{t('visaType') || 'Visa Type'}</p>
                      <p className="text-sm font-semibold text-gray-800">{selectedVisa}</p>
                    </div>
                  </div>
                </div>

                {/* Hidden fields to preserve step 1 data */}
                <input type="hidden" name="firstName" value={formRef.current?.firstName?.value || ''} />
                <input type="hidden" name="lastName" value={formRef.current?.lastName?.value || ''} />

                <p className="text-label">{t('email')}
                  <span className="font-bold text-red-600">*</span>
                </p>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder={t('emailPlaceholder') || 'Enter your email'}
                    required
                    className="w-full px-4 py-2 md:py-3 lg:py-3 text-input border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <p className="text-label mt-4 md:mt-6 lg:mt-6">{t('phoneNumber') || 'Phone Number'}
                  <span className="font-bold text-red-600">*</span>
                </p>
                <div className="relative">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder={t('phoneNumberPlaceholder') || '010-1234-5678'}
                    required
                    maxLength={13}
                    className="w-full px-4 py-2 md:py-3 lg:py-3 text-input border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <p className="text-label mt-4 md:mt-6 lg:mt-6">{t('message')}
                  <span className="font-bold text-red-600">*</span>
                </p>
                <div className="relative">
                  <textarea
                    name="message"
                    placeholder={t('messagePlaceholder') || 'Enter your message'}
                    required
                    rows={4}
                    className="w-full px-4 py-2 md:py-3 lg:py-3 text-input border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* 개인정보 제공 동의 */}
                <div className="mt-6">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={agreedToPrivacy}
                      onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                      className="w-5 h-5 shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span
                      className="text-sm text-gray-600 cursor-pointer hover:text-blue-600 hover:underline transition-colors"
                      onClick={() => setIsPrivacyModalOpen(true)}
                    >
                      {t('privacyConsent') || 'I agree to the collection and use of my personal information for loan consultation purposes.'}
                      <span className="text-red-600">*</span>
                    </span>
                  </div>
                </div>
              </>
            )}

            <div className={`text-center mt-0 md:mt-15 lg:mt-15 ${step === 2 ? 'flex gap-3' : ''}`}>
              {step === 2 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 rounded-lg md:rounded-xl text-md md:text-xl lg:text-xl text-gray-700 bg-gray-200 hover:bg-gray-300 px-6 md:px-10 lg:px-10 py-2 md:py-6 lg:py-6 font-semibold transition-colors"
                >
                  {t('button.back') || 'Back'}
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting || (step === 2 && !agreedToPrivacy)}
                style={{
                  flex: step === 2 ? 1 : undefined,
                  width: step === 1 ? '100%' : undefined,
                  display: 'block',
                  backgroundColor: (isSubmitting || (step === 2 && !agreedToPrivacy)) ? '#ccc' : buttonBgColor,
                }}
                className="rounded-lg md:rounded-xl text-md md:text-xl lg:text-xl text-white px-18 md:px-40 lg:px-40 py-2 md:py-6 lg:py-6 font-semibold disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? (t('submitting') || 'Submitting...')
                  : step === 1
                    ? t("button.continue")
                    : (t('button.submit') || 'Submit')}
              </button>
            </div>
          </form>
        </div>
      </div>

    </section>
  );

  // 개인정보 수집 동의 모달 (Portal로 body에 렌더링)
  const privacyModal = isPrivacyModalOpen && typeof document !== 'undefined' ? createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setIsPrivacyModalOpen(false)}
      />

      {/* 모달 컨텐츠 */}
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
        {/* 헤더 */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">
            {t('privacyPolicyTitle') || 'Personal Information Collection and Use Agreement'}
          </h3>
          <button
            type="button"
            onClick={() => setIsPrivacyModalOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 본문 */}
        <div className="px-6 py-4 overflow-y-auto max-h-[calc(80vh-140px)] text-sm text-gray-700 space-y-4">
          <p className="font-semibold">{t('privacyPolicyIntro') || 'GME Finance collects and uses personal information as follows for loan consultation services:'}</p>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">{t('privacyPolicyItem1Title') || '1. Items of Personal Information Collected'}</h4>
            <p>{t('privacyPolicyItem1Content') || 'Name, nationality, visa type, email address, phone number, consultation message'}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">{t('privacyPolicyItem2Title') || '2. Purpose of Collection and Use'}</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>{t('privacyPolicyItem2Content1') || 'Loan consultation and eligibility assessment'}</li>
              <li>{t('privacyPolicyItem2Content2') || 'Response to inquiries and customer communication'}</li>
              <li>{t('privacyPolicyItem2Content3') || 'Information provision regarding loan products and services'}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">{t('privacyPolicyItem3Title') || '3. Retention and Use Period'}</h4>
            <p>{t('privacyPolicyItem3Content') || 'Personal information will be destroyed immediately after the consultation is completed. However, if retention is required by relevant laws, it will be retained for the period specified by law.'}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">{t('privacyPolicyItem4Title') || '4. Right to Refuse Consent'}</h4>
            <p>{t('privacyPolicyItem4Content') || 'You have the right to refuse consent to the collection and use of personal information. However, if you refuse consent, loan consultation services may be restricted.'}</p>
          </div>
        </div>

        {/* 푸터 버튼 */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3">
          <button
            type="button"
            onClick={() => setIsPrivacyModalOpen(false)}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            {t('button.cancel') || 'Cancel'}
          </button>
          <button
            type="button"
            onClick={() => {
              setAgreedToPrivacy(true);
              setIsPrivacyModalOpen(false);
            }}
            className="flex-1 px-4 py-3 rounded-lg text-white font-medium transition-colors"
            style={{ backgroundColor: buttonBgColor }}
          >
            {t('button.agree') || 'Agree'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      {formSection}
      {privacyModal}
    </>
  );
}
