import { Injectable } from "@nestjs/common";
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { isValid } from "shortid";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsShortidConstraint implements ValidatorConstraintInterface {
  public validate = (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      if (id) {
        if (isValid(id)) {
          return resolve(true);
        }

        return resolve(false);
      }
      return resolve(true);
    });
  };

  public defaultMessage = () => {
    return 'ID ($value) isn\'t an valid shortid!';
  };
}

export function IsShortID(validationOptions?: ValidationOptions) {
  return function verify(object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsShortidConstraint,
    });
  };
}
