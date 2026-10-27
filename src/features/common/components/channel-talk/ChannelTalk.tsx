"use client";

import { useEffect } from "react";
import { openChannelTalk } from "@/lib/channelTalk";
import ChannelService from "./ChannelService";

const PLUGIN_KEY = "24dc2dfd-3ed1-4953-b395-a2255ed41dae";
const INTERACTION_EVENTS = ["mousemove", "scroll", "keypress", "touchstart", "click"] as const;

export default function ChannelTalk() {
  useEffect(() => {
    let loaded = false;

    const load = () => {
      if (loaded) return;
      loaded = true;

      INTERACTION_EVENTS.forEach((event) =>
        window.removeEventListener(event, load)
      );

      ChannelService.loadScript();
      ChannelService.boot({ pluginKey: PLUGIN_KEY }, () => {
        ChannelService.showChannelButton();
      });
    };

    INTERACTION_EVENTS.forEach((event) =>
      window.addEventListener(event, load, { once: true, passive: true })
    );

    return () => {
      INTERACTION_EVENTS.forEach((event) =>
        window.removeEventListener(event, load)
      );
      ChannelService.shutdown();
    };
  }, []);

  // data-channel-talk 가 붙은 링크 클릭을 한 곳에서 받아 메신저를 연다.
  // 서버 컴포넌트는 onClick 을 넘길 수 없어서 이 속성으로 표시만 한다
  useEffect(() => {
    const openOnLinkClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      if (event.target.closest("a[data-channel-talk]")) openChannelTalk(event);
    };
    document.addEventListener("click", openOnLinkClick);
    return () => document.removeEventListener("click", openOnLinkClick);
  }, []);

  return null;
}
