"use client";

import { useEffect } from "react";
import { bootChannelTalk, CHANNEL_TALK_SCRIPT_URL, openChannelTalk } from "@/lib/channelTalk";

const INTERACTION_EVENTS = ["mousemove", "scroll", "keypress", "touchstart", "click"] as const;

export default function ChannelTalk() {
  useEffect(() => {
    // 스크립트 파일만 미리 받아 둔다. 실행과 boot(쿠키 · API 요청)는 첫 조작 때 한다
    const prefetch = document.createElement("link");
    prefetch.rel = "prefetch";
    prefetch.as = "script";
    prefetch.href = CHANNEL_TALK_SCRIPT_URL;
    document.head.append(prefetch);

    const boot = () => {
      INTERACTION_EVENTS.forEach((event) => window.removeEventListener(event, boot));
      bootChannelTalk();
    };

    INTERACTION_EVENTS.forEach((event) =>
      window.addEventListener(event, boot, { once: true, passive: true })
    );

    return () => {
      INTERACTION_EVENTS.forEach((event) => window.removeEventListener(event, boot));
      prefetch.remove();
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
