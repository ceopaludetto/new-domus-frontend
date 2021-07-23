export function removeMask(val: string) {
  return val.replace(/[^\d]+/g, "");
}

export function retrieveTo(val: string | string[] | undefined) {
  if (!val) {
    return "";
  }

  return Array.isArray(val) ? val[0] : val;
}

export function hasPathname(value?: string | { pathname: string }): value is { pathname: string } {
  return !(typeof value === "string");
}
