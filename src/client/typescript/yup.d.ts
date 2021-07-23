/* eslint-disable max-classes-per-file */
import "yup";

declare module "yup" {
  export abstract class BaseSchema<TCast = any, TContext extends AnyObject = AnyObject, TOutput extends TCast = any> {
    file(message?: TestOptionsMessage<any, any>): this;
  }

  export class StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends BaseSchema<TType, TContext, TOut> {
    login(message?: TestOptionsMessage<any, any>): this;
    cpf(message?: TestOptionsMessage<any, any>): this;
    cnpj(message?: TestOptionsMessage<any, any>): this;
  }
}
