import { INestApplication, ValidationPipe } from "@nestjs/common";
import { UserInputError } from "apollo-server-express";
import cookie from "cookie-parser";
import { static as serve } from "express";
import helmet from "helmet";
import path from "path";

import { formatErrors } from "./validations/format";

export function installMiddlewares(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => new UserInputError("Erro de validação", formatErrors(errors)),
    })
  );

  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  if (!process.env.NO_SERVE) {
    app.use(
      "/image",
      serve(path.resolve(process.env.UPLOADS_PATH as string), {
        maxAge: process.env.NODE_ENV === "production" ? "1y" : undefined,
      })
    );
  }

  app.use(cookie());
}
