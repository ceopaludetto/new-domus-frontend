import { removeMask } from "@/client/utils/string";

type Format = ((v: string) => (RegExp | string)[]) | (RegExp | string)[];

function createNumberMask(pattern: Format) {
  function getTrailing(current: (string | RegExp)[], i: number, val?: string): [string, number] {
    let curr = val ?? "";
    const index = i;
    if (typeof current[index] === "string") {
      curr += current[index];
    } else {
      return [curr, index];
    }

    return getTrailing(current, index + 1, curr);
  }

  function format(val = "") {
    const numbers = removeMask(val);
    const chars = numbers.split("");

    const current = Array.isArray(pattern) ? pattern : pattern(numbers);

    let result = "";

    for (let i = 0, j = 0; i < current.length && j < chars.length; j += 1) {
      const [trailing, jumped] = getTrailing(current, i);
      result += trailing + chars[j];
      i = jumped + 1;
    }

    return result;
  }

  function replace(val = "") {
    const numbers = removeMask(val);
    const current = Array.isArray(pattern) ? pattern : pattern(numbers);

    if (!numbers) {
      return "";
    }

    const result = current.reduce((acc, v, i) => {
      if (typeof v === "string") {
        return acc + v;
      }

      if (val[i]) {
        return acc + val[i];
      }

      return `${acc}_`;
    }, "");

    return result as string;
  }

  return {
    format,
    replace,
    mask: true,
  };
}

export const cep = createNumberMask([/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]);
export const cpf = createNumberMask([/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]);
export const cnpj = createNumberMask([
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  "/",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
]);

export const tel = createNumberMask((v: string) => {
  if (v.length >= 11) {
    return ["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];
  }

  return ["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];
});

export const date = createNumberMask([/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]);
