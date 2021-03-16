export function shouldAllowAccess(isAuthenticated: boolean, rule?: boolean) {
  if (rule === undefined) {
    return true;
  }

  return rule === isAuthenticated;
}
