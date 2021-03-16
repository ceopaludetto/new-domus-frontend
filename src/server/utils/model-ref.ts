/* eslint-disable global-require, @typescript-eslint/no-var-requires, import/no-dynamic-require */
import type { Type } from "@nestjs/common";

const cache: Record<string, any> = {};

export function ModelRef<T>(path: string): Type<T> {
  if (module.hot) {
    if (cache[path]) {
      return cache[path];
    }

    cache[path] = require(`@/server/models/${path}`).default;

    module.hot.accept(`@/server/models/${path}`, () => {
      cache[path] = require(`@/server/models/${path}`).default;
    });

    return cache[path] as Type<T>;
  }

  const model = require(`../models/${path}`);

  return model.default as Type<T>;
}
