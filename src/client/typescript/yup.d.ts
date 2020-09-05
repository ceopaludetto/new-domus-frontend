import type { StringSchema, TestOptionsMessage } from "yup";

declare module "yup" {
  interface StringSchema {
    login(message?: TestOptionsMessage<any, any>): StringSchema;
    cpf(message?: TestOptionsMessage<any, any>): StringSchema;
    cnpj(message?: TestOptionsMessage<any, any>): StringSchema;
  }
}
