/**
 * This function is used to class-transformer transform decorator
 * @param val string
 */
export function removeMask(val: string) {
  return val.replace(/[^\d]+/g, "");
}
