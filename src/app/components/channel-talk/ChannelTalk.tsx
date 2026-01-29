"use client";

import { useEffect } from "react";
import ChannelService from "./ChannelService";

const PLUGIN_KEY = "24dc2dfd-3ed1-4953-b395-a2255ed41dae";

export default function ChannelTalk() {
  useEffect(() => {
    ChannelService.loadScript();
    ChannelService.boot(
      {
        pluginKey: PLUGIN_KEY,
      },
      () => {
        ChannelService.showChannelButton();
      }
    );

    return () => {
      ChannelService.shutdown();
    };
  }, []);

  return null;
}
