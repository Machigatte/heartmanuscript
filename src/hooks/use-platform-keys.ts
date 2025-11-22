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

  return {
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
  };
}
