/**
 * This function is used to class-transformer transform decorator
 * @param val string
 */
export function capitalize(val: string) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

/**
 * This function is used to class-transformer transform decorator
 * @param val string
 */
export function trim(val: string) {
  return val.trim();
}

/**
 * This function is used to class-transformer transform decorator
 * @param val string
 */
export function email(val: string) {
  return val.trim().toLowerCase();
}
