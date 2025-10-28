import Image from "next/image";
import { COMMON_COLORS } from "@/constants/colors";

type ProcessItem = {
  id: string;
  content: string;
  icon: string;
  name: string;
  iconWidth?: number;
  iconHeight?: number;
};

interface ProcessStepProps {
  subtitleColor?: string;
  titleColor?: string;
}

const PROCESS: ProcessItem[] = [
  {
    id: 'apply gme app',
    content: "Download GME app on google play and app store Register and apply loan",
    icon: '/images/icons/app.svg',
    name: 'APPLY THROUGH GME APP',
    iconWidth: 90,
    iconHeight: 90,
  },
  {
    id: 'requirement submission',
    content: 'Fill up your information and submit required docs',
    icon: '/images/icons/submission.svg',
    name:'REQUIREMENT SUBMISSION',
    iconWidth: 84,
    iconHeight: 84,
  },
  {
    id: 'verification',
    content: 'Our staff will verify your documents and will check your credit standing',
    icon: '/images/icons/verification.svg',
    name :'VERIFICATION',
    iconWidth: 130,
    iconHeight: 130,
  },
  {
    id: 'approval',
    content: 'Once approved, contract signing will be digital',
    icon: '/images/icons/approval.svg',
    name:'APPROVAL',
    iconWidth: 100,
    iconHeight: 100,
  },
  {
    id: 'disbursements',
    content: 'After contract signing we will deposit the loan amount to your bank account',
    icon: '/images/icons/disbursements.svg',
    name :'DISBURSEMENTS',
    iconWidth: 100,
    iconHeight: 100,
  },
];

export default function ProcessStep({ subtitleColor = COMMON_COLORS.primaryText, titleColor = COMMON_COLORS.black }: ProcessStepProps){
  return (
      <section className="py-0 md:py-14 lg:py-16">
        <div className="mx-auto px-4 md:px-38 lg:px-38">
          <h2 className="text-heading text-center mb-2 md:mb-5 lg:mb-5" style={{ color: titleColor }}>Simple Loan Application</h2>
          <p className="text-md md:text-xl lg:text-2xl text-center mb-0 md:mb-10 lg:mb-12" style={{ color: subtitleColor }}>5 Step Applying Process</p>
          <div className="grid md:grid-cols-5 gap-5 md:gap-10 lg:gap-10 mt-0 py-8">
            {PROCESS.map((item) => (
              <article
                key={item.id}
                className="
                  rounded-xl md:rounded-3xl lg:rounded-3xl bg-white
                  flex flex-row md:flex-col
                  min-h-[110px] md:min-h-[450px]
                  shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] overflow-hidden
                  z-20
                "
              >
                {/* Mobile: Left side content, Desktop: Top content */}
                <div className="p-6 md:p-8 flex flex-col flex-1 justify-center md:justify-start">
                  <header className="mb-2 md:mb-3">
                    <p className="text-sm md:text-[1.4rem] font-medium leading-tight md:leading-none">{item.name}</p>
                  </header>
                  <p className="text-[0.6rem] md:text-base leading-snug line-clamp-3 md:line-clamp-8 text-gray-600">
                    {item.content}
                  </p>
                </div>
                {/* Mobile: Right side image, Desktop: Bottom image */}
                <div className="relative w-20 md:w-full h-full md:h-50 flex items-center justify-center md:items-end md:justify-end p-3 md:p-6 flex-shrink-0">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={item.iconWidth || 84}
                    height={item.iconHeight || 84}
                    className="object-contain w-20 h-20 md:w-auto md:h-auto"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
  )
}