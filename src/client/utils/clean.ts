export function clean(obj: Record<string, any>) {
  const res = obj;
  Object.keys(res).forEach((key) => {
    if (!res[key]) delete res[key];
  });
  return res;
}
