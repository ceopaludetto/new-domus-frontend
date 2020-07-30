import { Injectable } from "@nestjs/common";
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { removeMask } from "@/server/utils/transforms";

import * as Messages from "./messages";

@ValidatorConstraint({ async: false })
@Injectable()
export class IsCNPJConstraint implements ValidatorConstraintInterface {
  public validate = (cnpj: string): boolean => {
    const strCNPJ = removeMask(cnpj);

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
  };

  public defaultMessage = () => {
    return Messages.CNPJ;
  };
}

export function IsCNPJ(validationOptions?: ValidationOptions) {
  return function verify(object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCNPJConstraint,
    });
  };
}
