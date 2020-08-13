import type { IsomorphicLib } from "./common.dto";

export function getModule<T>(lib: IsomorphicLib<T>) {
  if ("default" in lib) {
    return lib.default;
  }

  return lib;
}
