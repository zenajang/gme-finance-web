'use client';
import React from 'react';
import { COMMON_COLORS } from "@/constants/colors";

interface LoanDetail {
  label: string;
  value: string;
  highlight?: boolean;
}

interface LoanDetailSectionProps {
  backgroundImage?: string;
}

export default function LoanDetailSection({ backgroundImage = '/images/default-background.jpg' }: LoanDetailSectionProps) {
  const loanDetails: LoanDetail[] = [
    {
      label: "Maximum Loan Amount",
      value: "Up to 30 mil"
    },
    {
      label: "Loan Duration",
      value: "3 - 45 months"
    },
    {
      label: "Possible remaining visa period",
      value: "6 - 48 months"
    },
    {
      label: "Loan Products",
      value: "ONE Loan, ONE Home Loan, Business Loan",
      highlight: true
    },
    {
      label: "Contract signing method",
      value: "Digital contract or Physical contracts"
    },
    {
      label: "Loanable Amount",
      value: "2 mil - 20mil"
    },
    {
      label: "Possible visa types",
      value: "E5, E7, F2, F5, F6, D8 and any other visa holders with legal work contract"
    },
    {
      label: "Repayment method",
      value: "Installments"
    },
    {
      label: "Early Settlement Charges",
      value: "Free"
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
    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"/>
      <div className="relative z-10 w-full mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 lg:mb-20 text-white drop-shadow-lg">
          Loan Details
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
                    <td className="py-5 px-5 md:px-6 text-black font-semibold text-sm md:text-md lg:text-lg md:text-base border-r border-black/30 text-center">
                      {detail.label}
                    </td>
                    <td className="py-5 px-5 md:px-6 text-black font-semibold text-sm md:text-md lg:text-lg md:text-base text-center">
                      {detail.label === "Possible visa types" ? (
                        <div className="text-sm md:text-base leading-relaxed">
                          E5, E7, F2, F5, F6, D8 and any other visa
                          <br />
                          holders with legal work contract
                        </div>
                      ) : (
                        detail.value
                      )}
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