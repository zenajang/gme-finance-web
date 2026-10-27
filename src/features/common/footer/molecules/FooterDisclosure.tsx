'use client';

import { useTranslation } from 'react-i18next';

// 법정 고지: 요율 3줄 + 고지문. 고지문은 단락마다 16px 간격 (시안 .reg-space)
const FooterDisclosure = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-[5px]">
      <p>
        <strong>{t('footer.loanRate')}</strong> {t('footer.loanRateValue')}
      </p>
      <p>
        <strong>{t('footer.overdueRate')}</strong> {t('footer.overdueRateValue')}
      </p>
      <p>
        <strong>{t('footer.loanPeriod')}</strong> {t('footer.loanPeriodValue')}
      </p>
      <p className="mt-4">{t('footer.noFees')}</p>
      <p className="mt-4">{t('footer.creditWarning')}</p>
      <p className="mt-4 font-bold text-[#e11b22]">{t('footer.debtWarning')}</p>
      <p className="mt-4">{t('footer.illegalFees')}</p>
      <p className="mt-4">{t('footer.fssContact')}</p>
    </div>
  );
};

export default FooterDisclosure;
