export function removeMask(val: string) {
  return val.replace(/[^\d]+/g, "");
}
