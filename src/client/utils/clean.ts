export function clean(obj: Record<string, any>) {
  const res = obj;
  Object.keys(res).forEach((key) => {
    if (!obj[key]) delete obj[key];
  });
  return res;
}
