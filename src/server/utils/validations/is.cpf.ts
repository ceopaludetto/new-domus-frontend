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
export class IsCPFConstraint implements ValidatorConstraintInterface {
  public validate = (cpf: string): boolean => {
    const strCPF = removeMask(cpf);

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
  };

  public defaultMessage = () => {
    return Messages.CPF;
  };
}

export function IsCPF(validationOptions?: ValidationOptions) {
  return function verify(object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCPFConstraint,
    });
  };
}
