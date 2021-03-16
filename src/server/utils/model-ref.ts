/* eslint-disable global-require, @typescript-eslint/no-var-requires, import/no-dynamic-require */
import type { Type } from "@nestjs/common";

export function ModelRef<T>(path: string): Type<T> {
  if (module.hot) {
    const model = require(`@/server/models/${path}`);

    return model.default as Type<T>;
  }

  const model = require(`../models/${path}`);

  return model.default as Type<T>;
}
