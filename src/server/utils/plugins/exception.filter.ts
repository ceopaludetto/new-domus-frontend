import { Catch } from "@nestjs/common";
import { GqlExceptionFilter } from "@nestjs/graphql";
import { AuthenticationError, UserInputError } from "apollo-server-express";

@Catch()
export class GenericExceptionFilter implements GqlExceptionFilter {
  public catch(exception: unknown) {
    if (exception instanceof AuthenticationError || exception instanceof UserInputError) {
      return exception;
    }

    return exception;
  }
}
