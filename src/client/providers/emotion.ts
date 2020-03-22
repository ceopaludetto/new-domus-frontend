import cache from "@emotion/cache";

export function createCache(nonce: string) {
  return cache({
    key: "t",
    nonce
  });
}
