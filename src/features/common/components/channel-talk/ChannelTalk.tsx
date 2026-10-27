"use client";

import { useEffect } from "react";
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

  return null;
}
