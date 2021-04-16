import type { IsomorphicLib, PreloadOptions } from "./types";

export function getModule<T>(lib: IsomorphicLib<T>) {
  if ("default" in lib) {
    return lib.default;
  }

  return lib;
}

export function hasFetchBefore<T>(c?: T): c is T & { fetchBefore: (options: PreloadOptions) => Promise<void> } {
  if (typeof c !== "function") {
    return false;
  }

  if ("fetchBefore" in c) {
    return true;
  }

  return false;
}
