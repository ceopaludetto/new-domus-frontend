import { Transform } from "class-transformer";

export function RemoveMask() {
  return Transform(({ value }) => {
    const v = typeof value !== "string" ? String(value) : value;

    return v.replace(/[^\d]+/g, "");
  });
}
