function parseDigits(val: string) {
  return (val.match(/\d/g) || []).join("");
}

function createNumberMask(pattern: (string | RegExp)[] | ((parsed: string) => (string | RegExp)[])) {
  let normalized: (string | RegExp)[] | ((val: string) => (string | RegExp)[]);
  if (Array.isArray(pattern)) {
    normalized = pattern;
  } else {
    normalized = (val: string) => pattern(val);
  }

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

  return (val = "") => {
    const numbers = parseDigits(val);
    const chars = numbers.split("");

    const current = typeof normalized === "function" ? normalized(numbers) : normalized;

    let result = "";
    let i = 0;
    let j = 0;

    while (i < current.length && j < chars.length) {
      const [trailing, jumped] = getTrailing(current, i);
      result += trailing + chars[j];
      i = jumped + 1;
      j += 1;
    }

    return result;
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
