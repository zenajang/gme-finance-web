import ChannelService from '@/features/common/components/channel-talk/ChannelService';

// 채널톡 웹 주소. 메신저를 못 열 때 새 탭으로 여는 링크로 쓴다
export const CHANNEL_TALK_URL = 'https://gme.channel.io';

// 링크 클릭 시 채널톡 메신저를 연다. boot 전 · 차단 · 실패면 링크 기본 동작(새 탭)을 그대로 둔다
export const openChannelTalk = (event: Pick<Event, 'preventDefault'>) => {
  if (!ChannelService.isBooted) return;
  event.preventDefault();
  ChannelService.showMessenger();
};
