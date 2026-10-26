'use client';

import Button from '@/features/home/atoms/Button';
import { CHANNEL_TALK_URL, openChannelTalk } from '@/lib/channelTalk';

const ApplyLoanButton = () => {
  return (
    <Button href={CHANNEL_TALK_URL} onClick={openChannelTalk}>
      Apply Loan
    </Button>
  );
};

export default ApplyLoanButton;
