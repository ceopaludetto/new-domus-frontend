import type { Type } from "@nestjs/common";

export function ModelRef<T>(path: string): Type<T> {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires, import/no-dynamic-require
  const model = require(`@/server/models/${path}`);

  return model.default as Type<T>;
}
