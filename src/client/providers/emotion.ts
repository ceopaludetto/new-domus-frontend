import cache from "@emotion/cache";

import { EMOTION_KEY } from "@/client/utils/constants";

export function createCache(nonce: string) {
  return cache({
    key: EMOTION_KEY,
    nonce
  });
}
