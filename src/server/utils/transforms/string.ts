import { Transform } from "class-transformer";

export function Capitalize() {
  return Transform(({ value }) => value.charAt(0).toUpperCase() + value.slice(1));
}

export function Trim() {
  return Transform(({ value }) => value.trim());
}

export function Mail() {
  return Transform(({ value }) => value.trim().toLowerCase());
}
