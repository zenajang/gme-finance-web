import Section from '@/features/home/molecules/Section';
import SectionHead from '@/features/home/molecules/SectionHead';
import { LOAN_TERMS } from '@/features/home/constants';

const CELL = 'border-b border-line p-4 text-left align-top max-sm:block';

const LoanTermsSection = () => {
  return (
    <Section id="loan-product-information" tone="gray">
      <SectionHead eyebrow="Loan Terms" />
      <div className="max-w-[960px] rounded-xl border border-[#dfe2e7] bg-white p-[34px] leading-[1.55] text-[#17191d] max-sm:p-[22px]">
        <h2 className="mb-2 text-[34px] leading-[1.55] font-bold tracking-[-0.025em] text-ink max-sm:text-[28px]">
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
            {LOAN_TERMS.map(({ label, value }) => (
              <tr key={label}>
                <th
                  scope="row"
                  className={`${CELL} w-[32%] bg-[#f7f8fa] font-bold max-sm:w-auto max-sm:border-b-0 max-sm:pb-1`}
                >
                  {label}
                </th>
                <td className={`${CELL} max-sm:pt-1`}>{value}</td>
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
