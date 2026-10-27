'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Section, SectionHead } from '@/features/home/molecules';

// 연 20% 원리금균등상환, 1,000원 단위 올림. 배포용 EMI 표(3~60개월 × ₩2M~₩30M) 1,682칸과 일치한다.
const MONTHLY_RATE = 0.2 / 12;

const getMonthlyPayment = (principal: number, months: number) => {
  const payment = (principal * MONTHLY_RATE) / (1 - (1 + MONTHLY_RATE) ** -months);
  return Math.ceil(payment / 1000) * 1000;
};

const won = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
  maximumFractionDigits: 0,
});

const RANGE = 'w-full accent-brand';
const LABEL_ROW = 'mb-3 flex justify-between gap-[18px] text-sm font-bold';

const CalculatorSection = () => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState(10_000_000);
  const [months, setMonths] = useState(24);

  const payment = getMonthlyPayment(amount, months);
  const total = payment * months;

  return (
    <Section id="calculator" tone="white" paddingClassName="py-[78px]">
      <SectionHead
        eyebrow={t('landing.calculator.eyebrow')}
        title={t('landing.calculator.title')}
      />
      <div
        role="group"
        data-reveal
        aria-label={t('landing.calculator.ariaLabel')}
        className="max-w-[820px] rounded-xl border border-[#dde0e5] bg-white p-8 tabular-nums backdrop-blur-[3px] max-lg:max-w-none max-md:p-[22px]"
      >
        <div className="mb-[26px]">
          <div className={LABEL_ROW}>
            <label htmlFor="loanAmount">{t('landing.calculator.amount')}</label>
            <output htmlFor="loanAmount" className="text-base">
              {won.format(amount)}
            </output>
          </div>
          <input
            id="loanAmount"
            className={RANGE}
            type="range"
            min={2_000_000}
            max={30_000_000}
            step={1_000_000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div className="mb-[26px]">
          <div className={LABEL_ROW}>
            <label htmlFor="loanMonths">{t('landing.calculator.period')}</label>
            <output htmlFor="loanMonths" className="text-base">
              {t('landing.calculator.months', { months })}
            </output>
          </div>
          <input
            id="loanMonths"
            className={RANGE}
            type="range"
            min={3}
            max={60}
            step={1}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
          />
        </div>
        <div aria-live="polite" className="rounded-lg border border-line bg-[#f6f7f9] p-[18px]">
          <div className="flex items-end justify-between gap-5 border-b border-line pb-3.5">
            <strong className="text-[13px]">{t('landing.calculator.monthlyPayment')}</strong>
            <output className="text-[28px] font-bold max-md:text-[23px]">
              {won.format(payment)}
            </output>
          </div>
          <div className="flex justify-between gap-4 pt-3 text-[13px] max-md:flex-col">
            <span>
              {t('landing.calculator.totalRepayment')} <strong>{won.format(total)}</strong>
            </span>
            <span>
              {t('landing.calculator.totalInterest')} <strong>{won.format(total - amount)}</strong>
            </span>
          </div>
        </div>
        <p className="mt-3.5 text-xs">{t('landing.calculator.disclaimer')}</p>
      </div>
    </Section>
  );
};

export default CalculatorSection;
