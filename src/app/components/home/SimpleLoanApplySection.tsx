import Image from "next/image";
import ProcessStep from "../sections/ProcessStep";
import LoanApplicationForm from "../sections/LoanApplicationForm";
import { COMMON_COLORS } from "@/constants/colors";
import FinancialPrioritySection from "./FinancialPrioritySection";
import ApplyLoanOnline from "./ApplyLoanOnline";

export default function SimpleLoanApplySection() {

  return (
    <div className="relative" style={{ background: `linear-gradient(to bottom, ${COMMON_COLORS.white} 0%, ${COMMON_COLORS.white} 75%, ${COMMON_COLORS.gradientOrange} 92%, ${COMMON_COLORS.gradientRedDeep} 100%)` }}>
      <ProcessStep/>
      <FinancialPrioritySection/>
      <ApplyLoanOnline/>
      <LoanApplicationForm/>
    </div>
  );
}