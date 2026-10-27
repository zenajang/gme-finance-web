'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const COMPANY_FIELDS = [
  'companyName',
  'brandName',
  'registrationNo',
  'ceo',
  'businessNo',
  'address',
  'phone',
] as const;

// 푸터 상단: 로고 + 회사정보 7항목 (700px 이하에서 세로 배치)
const FooterCompany = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-[110px_minmax(0,1fr)] items-start gap-[18px] max-[700px]:grid-cols-1">
      <Image
        src="/images/logo_g.png"
        alt="GME Finance"
        width={603}
        height={172}
        className="h-auto w-[105px] max-[700px]:w-[95px]"
      />
      <div className="space-y-[5px]">
        {COMPANY_FIELDS.map((field) => (
          <p key={field}>
            <strong>{t(`footer.label.${field}`)}</strong> {t(`footer.${field}`)}
          </p>
        ))}
      </div>
    </div>
  );
};

export default FooterCompany;
