'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const POLICY_LINKS = [
  { href: '/terms/use', labelKey: 'footer.termsOfUse' },
  { href: '/terms/company', labelKey: 'footer.lendingTerms' },
  { href: '/terms/product-changes', labelKey: 'footer.productChanges' },
  { href: '/privacy-policy', labelKey: 'footer.privacyPolicy' },
  { href: '/credit-info', labelKey: 'footer.creditInfoSystem' },
  { href: '/customer-rights', labelKey: 'footer.customerRights' },
  { href: '/third-party-disclosure', labelKey: 'footer.thirdPartyDisclosure' },
  { href: '/loan-product-info', labelKey: 'footer.loanProductInfo' },
] as const;

// 푸터 하단: 저작권 + 약관 · 정책 페이지 링크 8개
const FooterLinks = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-[34px] flex flex-wrap items-center gap-[7px] text-[11.5px]">
      <span>© 2026 GME Finance.</span>
      {POLICY_LINKS.map(({ href, labelKey }, index) => (
        <Fragment key={href}>
          {index > 0 && <span aria-hidden="true">|</span>}
          <Link href={href} className="underline">
            {t(labelKey)}
          </Link>
        </Fragment>
      ))}
    </div>
  );
};

export default FooterLinks;
