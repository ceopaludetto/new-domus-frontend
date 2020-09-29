import "yup";

declare module "yup" {
  export interface StringSchema {
    login(message?: TestOptionsMessage<any, any>): StringSchema;
    cpf(message?: TestOptionsMessage<any, any>): StringSchema;
    cnpj(message?: TestOptionsMessage<any, any>): StringSchema;
  }

  export interface MixedSchema<T> {
    file(message?: TestOptionsMessage<any, any>): MixedSchema<T>;
  }
}
