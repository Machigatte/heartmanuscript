"use client";

import { useState, useEffect } from "react";

export type PlatformType = "mac" | "windows" | "linux" | "ios" | "android" | "unknown";

export interface PlatformKeys {
  platform: PlatformType;

  /** 对 UI 显示友好的按键标签 */
  label: {
    mod: string;        // ⌘ / Ctrl
    alt: string;        // ⌥ / Alt
    shift: string;      // ⇧
    ctrl: string;       // ^ 或 Ctrl
  };

  /** 用于监听事件的键名 */
  key: {
    mod: "Meta" | "Control";
    alt: "Alt";
    shift: "Shift";
    ctrl: "Control";
  };
}

export function usePlatformKeys(): PlatformKeys {
  const [platformKeys, setPlatformKeys] = useState<PlatformKeys>({
    platform: "unknown",
    label: {
      mod: "Ctrl",
      alt: "Alt",
      shift: "⇧",
      ctrl: "Ctrl",
    },
    key: {
      mod: "Control",
      alt: "Alt",
      shift: "Shift",
      ctrl: "Control",
    },
  });

  useEffect(() => {
    if (typeof navigator === "undefined") return; // SSR 阶段直接返回

    let platform: PlatformType = "unknown";
    const ua = navigator.userAgent.toLowerCase();
    const platformStr = navigator.platform.toLowerCase();

    if (platformStr.includes("mac")) platform = "mac";
    else if (/iphone|ipad|ipod/.test(ua)) platform = "ios";
    else if (/android/.test(ua)) platform = "android";
    else if (platformStr.includes("win")) platform = "windows";
    else if (platformStr.includes("linux")) platform = "linux";
    else platform = "unknown";

    const isMacLike = platform === "mac" || platform === "ios";

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlatformKeys({
      platform,
      label: {
        mod: isMacLike ? "⌘" : "Ctrl",
        alt: isMacLike ? "⌥" : "Alt",
        shift: "⇧",
        ctrl: isMacLike ? "^" : "Ctrl",
      },
      key: {
        mod: isMacLike ? "Meta" : "Control",
        alt: "Alt",
        shift: "Shift",
        ctrl: "Control",
      },
    });
  }, []);

  return platformKeys;
}
