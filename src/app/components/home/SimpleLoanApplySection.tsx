import Image from "next/image";
import ProcessStep from "../sections/ProcessStep";
import LoanApplicationForm from "../sections/LoanApplicationForm";



export default function SimpleLoanApplySection() {

  return (
    <div className="bg-gradient-to-b from-white from-40% via-[#FF7645] via-70% to-[#CF080B] relative">
      <div className="absolute bottom-100 right-50 h-90 -mr-50 -mt-0">
        <Image
          src='/images/icons/line_r.svg'
          alt='line_r'
          width={550}
          height={550}
          className="object-contain"
          />
        </div>
      <div className="absolute top-100 left-10 w-[500px] h-55 -ml-10 -mb-20">
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