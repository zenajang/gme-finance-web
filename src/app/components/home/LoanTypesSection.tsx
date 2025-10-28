import Image from "next/image";
import React from "react";
import { COMMON_COLORS } from "@/constants/colors";

interface LoanTypesSectionProps {
  titleColor?: string;
}

export default function LoanTypesSection({ titleColor = COMMON_COLORS.black }: LoanTypesSectionProps = {}) {
  const loanTypes = [
    {
      name: "Housing Loan",
      icon: "/images/icons/housing.svg",
      position: { top: "16%", left: "29%" },
      position_name: { top: "3%", right: "84%" },
      mobilePosition: { top: "15%", left: "30%" },
      mobilePosition_name: { top: "0%", right: "82%" },
    },
    {
      name: "Vacation Loan",
      icon: "/images/icons/vacation.svg",
      position: { top: "16%", right: "27%" },
      position_name: { top: "3%", left: "85%" },
      mobilePosition: { top: "15%", right: "25%" },
      mobilePosition_name: { top: "0%", left: "85%" },
    },
    {
      name: "Student Loan",
      icon: "/images/icons/student.svg",
      position: { top: "45%", left: "12%" },
      position_name: { top: "45%", left: "-33%" },
      mobilePosition: { top: "44%", left: "14%" },
      mobilePosition_name: { top: "42%", left: "-20%" },
    },
    {
      name: "Car Loan",
      icon: "/images/icons/car.svg",
      position: { top: "45%", right: "11%" },
      position_name: { top: "45%", right: "-25%" },
      mobilePosition: { top: "44%", right: "9%" },
      mobilePosition_name: { top: "42%", right: "-19%" },
    },
    {
      name: "Property Loan",
      icon: "/images/icons/property.svg",
      position: { bottom: "16%", left: "29%" },
      position_name: { bottom: "3%", left: "-14%" },
      mobilePosition: { bottom: "15%", left: "30%" },
      mobilePosition_name: { bottom: "0%", left: "-7%" },
    },
    {
      name: "Business Loan",
      icon: "/images/icons/business.svg",
      position: { bottom: "16%", right: "28%" },
      position_name: { bottom: "3%", right: "-15%" },
      mobilePosition: { bottom: "15%", right: "26%" },
      mobilePosition_name: { bottom: "0%", right: "-10%" },
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 mb-5 md:mb-16 lg:mb-20">
      <div className="container mx-auto px-15 md:px-4 lg:px-4">
        <h2 className="text-heading text-center mb-8 md:mb-10 lg:mb-10" style={{ color: titleColor }}>Types of Loans</h2>
        <div className="relative max-w-xs md:max-w-2xl mx-auto aspect-square">
          {/* 배경 템플릿 이미지 */}
          <Image
            src="/images/loanType.svg"
            alt="Loan types background"
            fill
            className="object-contain"
            style={{ transform: 'translateX(6px)' }}
          />
          
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative ml-2">
              <Image
                src="/images/gme-logo.svg"
                alt="GME Loan"
                width={200}
                height={200}
                className="object-contain w-16 h-16 md:w-[200px] md:h-[200px]"
              />
              {/* 이미지 위에 텍스트 */}
              <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm md:text-4xl font-bold text-red-600 whitespace-nowrap">
                GME LOAN
              </p>
            </div>
          </div>
          
          {loanTypes.map((loan, index) => (
            <React.Fragment key={index}>
              {/* Mobile version */}
              <div
                className="absolute z-20 md:hidden"
                style={loan.mobilePosition}
              >
                <div className="flex flex-col items-center">
                  <Image
                    src={loan.icon}
                    alt={loan.name}
                    width={64}
                    height={64}
                    className="object-contain w-6 h-6"
                  />
                </div>
              </div>
              <div
                className="absolute z-20 md:hidden"
                style={loan.mobilePosition_name}
              >
                <div className="flex flex-col items-center">
                  <p className="text-xs font-medium text-red-600 mt-1 text-center">
                    {loan.name.split(' ').map((word, idx) => (
                      <span key={idx}>
                        {word}
                        {idx === 0 && loan.name.includes('Loan') && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              {/* Desktop version */}
              <div
                className="hidden md:block absolute z-20"
                style={loan.position}
              >
                <div className="flex flex-col items-center">
                  <Image
                    src={loan.icon}
                    alt={loan.name}
                    width={64}
                    height={64}
                    className="object-contain w-16 h-16"
                  />
                </div>
              </div>
              <div
                className="hidden md:block absolute z-20"
                style={loan.position_name}
              >
                <div className="flex flex-col items-center">
                  <p className="text-3xl font-medium text-red-600 mt-4 text-center whitespace-nowrap">
                    {loan.name}
                  </p>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}