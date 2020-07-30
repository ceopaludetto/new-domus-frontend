export function removeMask(val: string) {
  return val.replace(/[^\d]+/g, "");
}

export function splitPhone(val: string) {
  const [ddd, number] = val.split(" ");

  return {
    ddd: removeMask(ddd),
    number: removeMask(number),
  };
}
