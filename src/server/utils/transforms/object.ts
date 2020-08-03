export function cleanTruthy(obj?: any, denylist?: string[]) {
  if (obj) {
    const clone = { ...obj };
    Object.keys(clone).forEach((k) => {
      if (typeof clone[k] === "object" && Object.keys(clone[k]).length) {
        delete clone[k];
      }

      if (denylist && denylist.some((b) => b === k)) {
        delete clone[k];
      }
    });

    return Object.keys(clone);
  }
  return [];
}
