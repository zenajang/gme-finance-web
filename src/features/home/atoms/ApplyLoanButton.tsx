'use client';

import { useTranslation } from 'react-i18next';
import Button from '@/features/home/atoms/Button';
import { CHANNEL_TALK_URL, openChannelTalk } from '@/lib/channelTalk';

const ApplyLoanButton = () => {
  const { t } = useTranslation();

  return (
    <Button href={CHANNEL_TALK_URL} onClick={openChannelTalk}>
      {t('landing.applyLoan')}
    </Button>
  );
};

export default ApplyLoanButton;
