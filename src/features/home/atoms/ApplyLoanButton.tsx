'use client';

import type { MouseEvent } from 'react';
import ChannelService from '@/app/components/channel-talk/ChannelService';
import Button from '@/features/home/atoms/Button';

// 채널톡이 boot 되지 않았을 때(로드 전 · 차단 · 실패)만 새 탭 링크로 연다
const CHANNEL_TALK_URL = 'https://gme.channel.io';

const ApplyLoanButton = () => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!ChannelService.isBooted) return;
    event.preventDefault();
    ChannelService.showMessenger();
  };

  return (
    <Button href={CHANNEL_TALK_URL} onClick={handleClick}>
      Apply Loan
    </Button>
  );
};

export default ApplyLoanButton;
