import type { ColorMode } from "@/client/utils/types";

export const cookieStorageManager = (cookies = "", storageKey: string) => ({
  get(init: ColorMode) {
    const match = cookies.match(new RegExp(`(^| )${storageKey}=([^;]+)`));

    if (match) {
      return match[2] as ColorMode;
    }

    return init;
  },
  set(value: ColorMode) {
    document.cookie = `${storageKey}=${value}; MaxAge=31536000; Path=/; SameSite=Strict`;
  },
});
