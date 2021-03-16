import * as Yup from "yup";

import { removeMask } from "@/client/utils/string";

import * as Messages from "./constants";

Yup.addMethod(Yup.string, "login", function validate(message?: string) {
  return this.test("login", message ?? Messages.LOGIN, (v) => {
    if (!v) {
      return true;
    }

    if (/[\r\n(\-@?=#$\\/%)]+/.test(v)) {
      return false;
    }

    return true;
  });
});

Yup.addMethod(Yup.string, "cpf", function validate(message?: string) {
  return this.test("cpf", message ?? Messages.CPF, (v) => {
    if (!v) {
      return true;
    }

    const strCPF = removeMask(v);

    if (
      strCPF === "00000000000" ||
      strCPF === "11111111111" ||
      strCPF === "22222222222" ||
      strCPF === "33333333333" ||
      strCPF === "44444444444" ||
      strCPF === "55555555555" ||
      strCPF === "66666666666" ||
      strCPF === "77777777777" ||
      strCPF === "88888888888" ||
      strCPF === "99999999999"
    )
      return false;

    let soma;
    let rest;
    soma = 0;

    for (let i = 1; i <= 9; i += 1) soma += parseInt(strCPF.substring(i - 1, i), 10) * (11 - i);
    rest = (soma * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(strCPF.substring(9, 10), 10)) return false;

    soma = 0;
    for (let i = 1; i <= 10; i += 1) soma += parseInt(strCPF.substring(i - 1, i), 10) * (12 - i);
    rest = (soma * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(strCPF.substring(10, 11), 10)) return false;
    return true;
  });
});

Yup.addMethod(Yup.string, "cnpj", function validate(message?: string) {
  return this.test("cnpj", message ?? Messages.CNPJ, (v) => {
    if (!v) {
      return true;
    }

    const strCNPJ = removeMask(v);

    if (
      strCNPJ === "00000000000000" ||
      strCNPJ === "11111111111111" ||
      strCNPJ === "22222222222222" ||
      strCNPJ === "33333333333333" ||
      strCNPJ === "44444444444444" ||
      strCNPJ === "55555555555555" ||
      strCNPJ === "66666666666666" ||
      strCNPJ === "77777777777777" ||
      strCNPJ === "88888888888888" ||
      strCNPJ === "99999999999999"
    )
      return false;

    // validate DVs
    let len = strCNPJ.length - 2;
    let numbers = strCNPJ.substring(0, len);
    const digits = strCNPJ.substring(len);
    let soma = 0;
    let pos = len - 7;
    for (let i = len; i >= 1; i -= 1) {
      soma += Number(numbers.charAt(len - i)) * pos;
      pos -= 1;
      if (pos < 2) pos = 9;
    }
    let result = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (result !== Number(digits.charAt(0))) return false;

    len += 1;
    numbers = strCNPJ.substring(0, len);
    soma = 0;
    pos = len - 7;
    for (let i = len; i >= 1; i -= 1) {
      soma += Number(numbers.charAt(len - i)) * pos;
      pos -= 1;
      if (pos < 2) pos = 9;
    }
    result = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (result !== Number(digits.charAt(1))) return false;

    return true;
  });
});

Yup.addMethod(Yup.mixed, "file", function validate(message?: string) {
  return this.test("files", message ?? Messages.FILE, (val) => {
    if (val && Array.isArray(val)) {
      return val[0] instanceof File;
    }
    return true;
  });
});
