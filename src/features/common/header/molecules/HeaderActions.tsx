'use client';

import { useTranslation } from 'react-i18next';
import { LinkButton } from '@/features/common/atoms';
import LanguageSwitch from '@/features/common/header/molecules/LanguageSwitch';

interface HeaderActionsProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

// 헤더 오른쪽: 언어 선택 · 로그인 (768px 이상) + 모바일 메뉴 버튼 (1024px 미만)
const HeaderActions = ({ isMenuOpen, onToggleMenu }: HeaderActionsProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex shrink-0 items-center gap-3">
      <LanguageSwitch className="max-md:hidden" />
      <LinkButton href="/login" appearance={{ variant: 'outline', size: 'sm' }} className="max-md:hidden">
        {t('header.login')}
      </LinkButton>
      <button
        type="button"
        aria-controls="mobile-menu"
        aria-expanded={isMenuOpen}
        aria-label={t('header.toggleMenu')}
        onClick={onToggleMenu}
        className="flex size-[38px] shrink-0 items-center justify-center rounded-[7px] border border-line bg-white text-ink lg:hidden"
      >
        <svg aria-hidden="true" className="size-[19px]" fill="none" viewBox="0 0 24 24">
          <path
            d={isMenuOpen ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.8"
          />
        </svg>
      </button>
    </div>
  );
};

export default HeaderActions;
