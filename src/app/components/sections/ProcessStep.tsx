import Image from "next/image";

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
    iconWidth: 68,
    iconHeight: 68,
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

export default function ProcessStep({ subtitleColor = "#EF4444", titleColor = "#000000" }: ProcessStepProps){
  return (
      <section className="py-16">
        <div className="mx-auto px-38">
          <h2 className="text-5xl font-bold text-center mb-5" style={{ color: titleColor }}>Simple Loan Application</h2>
          <p className="text-2xl text-center mb-12" style={{ color: subtitleColor }}>5 Step Applying Process</p>
          <div className="grid md:grid-cols-5 gap-10 mt-8 py-8">
            {PROCESS.map((item) => (
              <article
                key={item.id}
                className="
                  rounded-3xl bg-white
                  flex flex-col
                  min-h-[360px] md:min-h-[450px]
                  shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] overflow-hidden
                  z-20
                "
              >
                <div className="p-8 flex flex-col flex-1">
                  <header className="flex items-end justify-between mb-3">
                    <div className="flex items-end gap-2">
                      <p className="text-[1.4rem] font-medium leading-none">{item.name}</p>
                    </div>
                  </header>

                  <p className="leading-snug line-clamp-8 mb-3 text-gray-600">
                    {item.content}
                  </p>
                </div>
                <div className="relative w-full h-50 flex items-end justify-end p-6">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={item.iconWidth || 84}
                    height={item.iconHeight || 84}
                    className="object-contain"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
  )
}