import type { Ref } from "react";

export function merge<T>(refs: Ref<T>[]) {
  return (value: T) =>
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as any).current = value;
      }
    });
}
