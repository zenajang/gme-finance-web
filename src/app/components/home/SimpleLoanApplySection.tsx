import Image from "next/image";
import ProcessStep from "../sections/ProcessStep";
import LoanApplicationForm from "../sections/LoanApplicationForm";
import { COMMON_COLORS } from "@/constants/colors";

export default function SimpleLoanApplySection() {

  return (
    <div className="relative" style={{ background: `linear-gradient(to bottom, ${COMMON_COLORS.white} 0%, ${COMMON_COLORS.white} 40%, ${COMMON_COLORS.gradientOrange} 70%, ${COMMON_COLORS.gradientRedDeep} 100%)` }}>
      <div className="hidden md:block absolute bottom-100 right-50 h-90 -mr-50 -mt-0">
        <Image
          src='/images/icons/line_r.svg'
          alt='line_r'
          width={550}
          height={550}
          className="object-contain"
          />
        </div>
      <div className="hidden md:block absolute top-100 left-10 w-[500px] h-55 -ml-10 -mb-20">
        <Image
          src='/images/icons/line_l.svg'
          alt='line_l'
          width={550}
          height={550}
          className="object-contain"
          />
      </div>
      <ProcessStep/>
      <LoanApplicationForm/>
    </div>
  );
}