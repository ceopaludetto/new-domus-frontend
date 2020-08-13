/**
 * This function is used to class-transformer transform decorator
 * @param val string
 */
export function removeMask(val: any) {
  const v = typeof val !== "string" ? String(val) : val;

  return v.replace(/[^\d]+/g, "");
}
