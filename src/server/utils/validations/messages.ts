import { ValidationArguments } from "class-validator";

import { capitalize } from "@/server/utils/transforms";

export const STRING = "Campo deve ser do tipo texto";
export const EMAIL = "E-mail inválido";
export const GENDER = "Gênero inválido";
export const MAX_LENGTH = (args: ValidationArguments) => {
  return `${
    args.property !== "cnpj" && args.property !== "cpf" ? capitalize(args.property) : args.property.toUpperCase()
  } deve conter no máximo ${args.constraints[0]} caracteres`;
};
export const CNPJ = "CNPJ inválido";
export const CPF = "CPF inválido";
export const DATE = "Campo deve ser do tipo data";
export const UNIQUE = "Campo já cadastrado";
