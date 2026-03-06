"use client";

import Image from "next/image";
import { COMMON_COLORS } from "@/constants/colors";
import { useTranslation } from "react-i18next";

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


export default function ProcessStep({ subtitleColor = COMMON_COLORS.primaryText, titleColor = COMMON_COLORS.black }: ProcessStepProps) {
  const { t } = useTranslation()

  const PROCESS: ProcessItem[] = [
    {
      id: 'apply gme app',
      content: "home.simpleLoanStep1Des",
      icon: '/images/icons/app.svg',
      name: 'home.simpleLoanStep1',
      iconWidth: 90,
      iconHeight: 90,
    },
    {
      id: 'requirement submission',
      content: 'home.simpleLoanStep2Des',
      icon: '/images/icons/submission.svg',
      name: 'home.simpleLoanStep2',
      iconWidth: 84,
      iconHeight: 84,
    },
    {
      id: 'verification',
      content: 'home.simpleLoanStep3Des',
      icon: '/images/icons/verification.svg',
      name: 'home.simpleLoanStep3',
      iconWidth: 130,
      iconHeight: 130,
    },
    {
      id: 'approval',
      content: 'home.simpleLoanStep4Des',
      icon: '/images/icons/approval.svg',
      name: 'home.simpleLoanStep4',
      iconWidth: 100,
      iconHeight: 100,
    },
    {
      id: 'disbursements',
      content: 'home.simpleLoanStep5Des',
      icon: '/images/icons/disbursements.svg',
      name: 'home.simpleLoanStep5',
      iconWidth: 100,
      iconHeight: 100,
    },
  ];

  return (
    <section className="py-0 md:py-14 lg:py-16 z-20">
      <div className="mx-auto px-4 md:px-38 lg:px-38">
        <h2 className="text-heading text-center mb-2 mt-10 md:mb-5 lg:mb-10" style={{ color: titleColor }}>{t('home.quickLoanApplicationTitle')}</h2>
        <p className="text-subheading text-center mb-0 md:mb-10 lg:mb-12 " style={{ color: subtitleColor }}>{t('home.quickLoanApplicationSubTitle')}</p>
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
                  <p className="text-sm md:text-[1.4rem] font-medium leading-[28px]">{t(item.name)}</p>
                </header>
                <p className="text-[0.6rem] md:text-base leading-snug line-clamp-3 md:line-clamp-8 text-gray-600">
                  {t(item.content)}
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