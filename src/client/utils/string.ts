export function removeMask(value: string) {
  return value.replace(/[^\d]+/g, "");
}
