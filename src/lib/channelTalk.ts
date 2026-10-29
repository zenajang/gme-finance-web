import ChannelService from '@/features/common/components/channel-talk/ChannelService';

// 채널톡 웹 주소. 메신저를 못 열 때 새 탭으로 여는 링크로 쓴다
export const CHANNEL_TALK_URL = 'https://gme.channel.io';
export const CHANNEL_TALK_SCRIPT_URL = 'https://cdn.channel.io/plugin/ch-plugin-web.js';

const PLUGIN_KEY = '24dc2dfd-3ed1-4953-b395-a2255ed41dae';
// 클릭 후 이 시간 안에 boot 가 안 끝나면 새 탭으로 연다. 브라우저 팝업 허용 시간(약 5초)보다 짧게 둔다
const BOOT_TIMEOUT_MS = 4000;

let bootPromise: Promise<boolean> | null = null;

// 스크립트를 실행하고 boot 한다. 여러 번 불러도 한 번만 실행하고 성공 여부를 돌려준다
export const bootChannelTalk = () => {
  bootPromise ??= new Promise((resolve) => {
    ChannelService.loadScript();
    ChannelService.boot({ pluginKey: PLUGIN_KEY }, (error) => {
      if (!error) ChannelService.showChannelButton();
      resolve(!error);
    });
  });
  return bootPromise;
};

// 링크 클릭 시 채널톡 메신저를 연다. boot 전이면 끝날 때까지 기다리고, 실패 · 시간 초과면 새 탭으로 연다
export const openChannelTalk = (event: Pick<Event, 'preventDefault'>) => {
  event.preventDefault();
  const timeout = new Promise<boolean>((resolve) => setTimeout(() => resolve(false), BOOT_TIMEOUT_MS));
  Promise.race([bootChannelTalk(), timeout]).then((isBooted) => {
    if (isBooted) ChannelService.showMessenger();
    else window.open(CHANNEL_TALK_URL, '_blank', 'noopener,noreferrer');
  });
};
