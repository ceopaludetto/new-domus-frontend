import { SerializedStyles } from "@emotion/core";

import { Theme, Colors } from "@/client/utils/common.dto";

export function traverse<T extends string>(prop: T, opts: { [K in T]: SerializedStyles }) {
  return opts[prop];
}

export function dynamic(theme: Theme, prop: keyof Colors, cb: (v: Theme["palette"][keyof Colors]) => SerializedStyles) {
  return cb(theme.palette[prop]);
}

export function is(
  prop: boolean,
  yes: (() => SerializedStyles) | SerializedStyles,
  no?: (() => SerializedStyles) | SerializedStyles
) {
  if (prop) {
    return typeof yes === "function" ? yes() : yes;
  }

  if (no) return typeof no === "function" ? no() : no;

  return undefined;
}
