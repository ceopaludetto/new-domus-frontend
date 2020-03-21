import { rem } from "polished";

export function toRem(v: number | number[], def?: number | string) {
  if (Array.isArray(v)) {
    return v.map((px: number) => rem(px, def)) as string[];
  }

  return rem(v, def) as string;
}
