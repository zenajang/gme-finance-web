import { Section, SectionHead } from '@/features/home/molecules';

const TERMS = [
  { label: 'Registration information', value: 'Registration No. 2019-금감원-1801' },
  { label: 'Interest rate', value: 'Up to 20% per annum' },
  { label: 'Interest calculation', value: 'Interest is charged monthly on the agreed date.' },
  {
    label: 'Repayment method',
    value:
      'Repayment amounts may vary depending on the loan terms and repayment method stated in the individual loan agreement.',
  },
  {
    label: 'Overdue interest rate',
    value:
      'Loan rate + up to 3% per annum, within the legal maximum rate of 20% per annum. Applicable only to contracts renewed from July 7, 2021.',
  },
  { label: 'Related costs', value: 'No additional fees or early repayment penalties.' },
  { label: 'Loan period', value: '3–60 months' },
  {
    label: 'Registration verification',
    value: 'Financial Supervisory Service (registration check) · 02-3145-5114',
  },
] as const;

const CELL = 'border-b border-line p-4 text-left align-top max-md:block';

const LoanTermsSection = () => {
  return (
    <Section id="loan-product-information" tone="gray">
      <SectionHead eyebrow="Loan Terms" hasReveal={false} />
      <div className="max-w-[960px] rounded-xl border border-[#dfe2e7] bg-white p-[34px] leading-[1.55] text-[#17191d] max-md:p-[22px]">
        <h2 className="mb-2 text-[34px] leading-[1.55] font-bold tracking-[-0.025em] text-ink max-md:text-[28px]">
          Loan Product Information
        </h2>
        <p className="mb-7 text-[#5c616b]">Required loan terms and registration information.</p>
        <p className="mb-5 text-[22px] font-extrabold">GME Loan</p>
        <p className="mb-[22px] text-[15px] font-semibold text-[#4f5560]">
          Licensed lender · Licensed by the Financial Supervisory Service · Registration No.
          2019-금감원-1801
        </p>
        <table className="w-full border-collapse">
          <tbody>
            {TERMS.map(({ label, value }) => (
              <tr key={label}>
                <th
                  scope="row"
                  className={`${CELL} w-[32%] bg-[#f7f8fa] font-bold max-md:w-auto max-md:border-b-0 max-md:pb-1`}
                >
                  {label}
                </th>
                <td className={`${CELL} max-md:pt-1`}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-7 border-2 border-brand bg-white p-[18px] font-bold">
          Excessive debt can bring great misfortune to you.
        </div>
        <p className="my-3.5 text-sm text-[#555b65]">
          It is illegal to request or receive brokerage fees.
        </p>
        <p className="my-3.5 text-sm text-[#555b65]">
          Loan approval and final terms are subject to screening and individual circumstances.
          Please review the product description and agreement before signing.
        </p>
      </div>
    </Section>
  );
};

export default LoanTermsSection;
