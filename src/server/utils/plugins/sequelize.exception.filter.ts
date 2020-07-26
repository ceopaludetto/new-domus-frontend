import { Catch } from "@nestjs/common";
import { GqlExceptionFilter } from "@nestjs/graphql";
import { UserInputError } from "apollo-server-express";
import { ValidationError } from "class-validator";
import { Error, UniqueConstraintError } from "sequelize";

import { formatErrors } from "../validations/format";

@Catch(Error)
export class SequelizeExceptionFilter implements GqlExceptionFilter {
  public catch(exception: Error) {
    if (exception instanceof UniqueConstraintError) {
      const errors = exception.errors.map((e) => {
        const err = new ValidationError();
        err.children = [];
        err.property = e.path;
        err.value = e.value;
        err.target = (e as any).instance;
        err.constraints = {
          [e.type]: e.message,
        };

        return err;
      });

      return new UserInputError("Erro de validação", formatErrors(errors));
    }

    return exception;
  }
}
