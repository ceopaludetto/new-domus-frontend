import type { IsomorphicLib, Client } from "./common.dto";

export function getModule<T>(lib: IsomorphicLib<T>) {
  if ("default" in lib) {
    return lib.default;
  }

  return lib;
}

export function hasFetchBefore<T>(c?: T): c is T & { fetchBefore: (client: Client) => Promise<void> } {
  if (!c) {
    return false;
  }

  if ("fetchBefore" in c) {
    return true;
  }

  return false;
}
