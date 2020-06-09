import { INestApplication, ValidationPipe } from "@nestjs/common";
import { UserInputError } from "apollo-server-express";
import compression from "compression";
import cookie from "cookie-parser";
import { static as serve } from "express";
import helmet from "helmet";

import { GenericExceptionFilter } from "./exception.filter";
import { formatErrors } from "./validations/format";

export function installMiddlewares(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => new UserInputError("Erro de validação", formatErrors(errors)),
    })
  );
  app.useGlobalFilters(new GenericExceptionFilter());
  app.enableCors();

  if (process.env.NODE_ENV === "production") {
    app.use(compression());
  }

  app.use(helmet());
  app.use(cookie());

  if (!process.env.NO_SERVE) {
    app.use(
      process.env.PUBLIC_PATH,
      serve(process.env.STATIC_FOLDER as string, {
        maxAge: process.env.NODE_ENV === "production" ? "1y" : undefined,
      })
    );
  }
}
