'use client';

import { useTranslation } from 'react-i18next';
import { FooterCompany, FooterDisclosure, FooterLinks } from '@/features/common/footer/molecules';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-[#d9dde3] bg-[#f5f5f5]/95 pt-7 pb-6 font-[Arial,Helvetica,sans-serif] text-[13px] leading-[1.45] text-[#526078]">
      <div className="mx-auto w-[min(96%,1820px)]">
        <FooterCompany />
        <div className="my-7 h-px bg-[#cfd4db]" />
        <FooterDisclosure />
        <p className="mt-[18px] leading-normal font-semibold">{t('footer.remitNote')}</p>
        <FooterLinks />
      </div>
    </footer>
  );
};

export default Footer;
