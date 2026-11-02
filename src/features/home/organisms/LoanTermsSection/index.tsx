'use client';

import { useTranslation } from 'react-i18next';
import { Section, SectionHead } from '@/features/home/molecules';

// 표 행 순서. 문구는 landing.loanTerms.items.<key>.{title,description}
const TERM_KEYS = [
  'registration',
  'interestRate',
  'interestCalculation',
  'repaymentMethod',
  'overdueRate',
  'relatedCosts',
  'loanPeriod',
  'registrationCheck',
] as const;

const CELL = 'border-b border-line p-4 text-left align-top max-md:block';

const LoanTermsSection = () => {
  const { t } = useTranslation();

  return (
    <Section id="loan-product-information" tone="gray">
      <SectionHead eyebrow={t('landing.loanTerms.eyebrow')} hasReveal={false} />
      <div className="max-w-[960px] rounded-xl border border-[#dfe2e7] bg-white p-[34px] leading-[1.55] text-[#17191d] max-md:p-[22px]">
        <h2 className="mb-2 text-[34px] leading-[1.55] font-bold tracking-[-0.025em] text-ink max-md:text-[28px]">
          {t('landing.loanTerms.title')}
        </h2>
        <p className="mb-7 text-[#5c616b]">{t('landing.loanTerms.description')}</p>
        <p className="mb-5 text-[22px] font-extrabold">{t('landing.loanTerms.productName')}</p>
        <p className="mb-[22px] text-[15px] font-semibold text-[#4f5560]">
          {t('landing.loanTerms.license')}
        </p>
        <table className="w-full border-collapse">
          <tbody>
            {TERM_KEYS.map((key) => (
              <tr key={key}>
                <th
                  scope="row"
                  className={`${CELL} w-[32%] bg-[#f7f8fa] font-bold max-md:w-auto max-md:border-b-0 max-md:pb-1`}
                >
                  {t(`landing.loanTerms.items.${key}.title`)}
                </th>
                <td className={`${CELL} max-md:pt-1`}>
                  {t(`landing.loanTerms.items.${key}.description`)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-7 border-2 border-brand bg-white p-[18px] font-bold">
          {t('landing.loanTerms.debtWarning')}
        </div>
        <p className="my-3.5 text-sm text-[#555b65]">
          {t('landing.loanTerms.brokerageWarning')}
        </p>
        <p className="my-3.5 text-sm text-[#555b65]">
          {t('landing.loanTerms.approvalNotice')}
        </p>
      </div>
    </Section>
  );
};

export default LoanTermsSection;
