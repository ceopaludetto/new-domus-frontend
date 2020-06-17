export function keys(obj?: any, blacklist?: string[]) {
  if (obj) {
    const clone = { ...obj };
    Object.keys(clone).forEach((k) => {
      if (Object.keys(clone[k]).length) {
        delete clone[k];
      }

      if (blacklist && blacklist.some((b) => b === k)) {
        delete clone[k];
      }
    });

    return Object.keys(clone);
  }
  return [];
}
