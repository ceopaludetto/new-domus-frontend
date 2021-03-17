/* eslint-disable global-require, @typescript-eslint/no-var-requires, import/no-dynamic-require */
import type { Type } from "@nestjs/common";

export function ModelRef<T>(path: string): Type<T> {
  if (module.hot) {
    return require(`@/server/models/${path}`).default as Type<T>;
  }

  return require(`../models/${path}`).default as Type<T>;
}
