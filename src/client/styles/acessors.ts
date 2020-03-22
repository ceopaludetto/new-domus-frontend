import { SerializedStyles } from "@emotion/core";

export function traverse<T extends string>(prop: T, opts: { [K in T]: SerializedStyles }) {
  return opts[prop];
}
