import Image from "next/image";

interface LoanTypesSectionProps {
  titleColor?: string;
}

export default function LoanTypesSection({ titleColor = '#000000' }: LoanTypesSectionProps = {}) {
  const loanTypes = [
    { name: "Housing Loan", icon: "/images/icons/housing.svg", position: { top: "16%", left: "29%" },position_name: { top: "3%", right: "85%" }, },
    { name: "Vacation Loan", icon: "/images/icons/vacation.svg", position: { top: "16%", right: "28%" },position_name: { top: "3%", left: "85%" }, },
    { name: "Student Loan", icon: "/images/icons/student.svg", position: { top: "45%", left: "12%" },position_name: { top: "45%", left: "-35%" }, },
    { name: "Car Loan", icon: "/images/icons/car.svg", position: { top: "45%", right: "11%" },position_name: { top: "45%", right: "-25%" }, },
    { name: "Property Loan", icon: "/images/icons/property.svg", position: { bottom: "16%", left: "29%" },position_name: { bottom: "3%", left: "-15%" }, },
    { name: "Business Loan", icon: "/images/icons/business.svg", position: { bottom: "16%", right: "28%" },position_name: { bottom: "3%", right: "-15%" }, },
  ];

  return (
    <section className="py-20 mb-20">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-10" style={{ color: titleColor }}>Types of Loans</h2>
        <div className="relative max-w-2xl mx-auto aspect-square">
          {/* 배경 템플릿 이미지 */}
          <Image 
            src="/images/loanType.svg" 
            alt="Loan types background" 
            fill
            className="object-contain"
          />
          
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <Image 
                src="/images/gme-logo.svg" 
                alt="GME Loan" 
                width={200}
                height={200}
                className="object-contain"
              />
              {/* 이미지 위에 텍스트 */}
              <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-red-600 whitespace-nowrap">
                GME LOAN
              </p>
            </div>
          </div>
          
          
          {/* 각 대출 유형 아이콘들 */}
          {loanTypes.map((loan, index) => (
            <div
              key={index}
              className="absolute z-20"
              style={loan.position}
            >
              <div className="flex flex-col items-center">
                <Image
                  src={loan.icon}
                  alt={loan.name}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
           {loanTypes.map((loan, index) => (
            <div
              key={index}
              className="absolute z-20"
              style={loan.position_name}
            >
              <div className="flex flex-col items-center">
                <p className="text-3xl font-medium text-red-600 mt-4 whitespace-nowrap">
                  {loan.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}