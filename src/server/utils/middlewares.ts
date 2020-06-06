import { INestApplication, ValidationPipe } from "@nestjs/common";
import { UserInputError } from "apollo-server-express";
import compression from "compression";
import cookie from "cookie-parser";
import { static as serve } from "express";
import helmet from "helmet";

import { GenericExceptionFilter } from "./exception.filter";

export function installMiddlewares(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const constraints: { [index: string]: string[] } = {};

        const properties = errors.map((e) => e.property);

        errors.forEach((e) => {
          const messages: string[] = [];

          Object.keys(e.constraints).forEach((ck) => {
            messages.push(e.constraints[ck]);
          });

          constraints[e.property] = messages;
        });

        return new UserInputError("Erro de validação", {
          fields: properties,
          messages: constraints,
        });
      },
    })
  );
  app.useGlobalFilters(new GenericExceptionFilter());
  app.enableCors();

  if (process.env.NODE_ENV === "production") {
    app.use(compression());
  }

  app.use(helmet());
  app.use(cookie());

  app.use(
    process.env.PUBLIC_PATH,
    serve(process.env.STATIC_FOLDER as string, {
      maxAge: process.env.NODE_ENV === "production" ? "1y" : undefined,
    })
  );
}
