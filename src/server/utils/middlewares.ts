import { INestApplication, ValidationPipe } from "@nestjs/common";
import { UserInputError } from "apollo-server-express";
import compression from "compression";
import cookie from "cookie-parser";
import { static as serve } from "express";
import helmet from "helmet";
import { PinoLogger } from "nestjs-pino";

import { LoggingInterceptor } from "./plugins/logging.interceptor";
import { formatErrors } from "./validations/format";

export async function installMiddlewares(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => new UserInputError("Erro de validação", formatErrors(errors)),
    })
  );
  app.useGlobalInterceptors(new LoggingInterceptor(await app.resolve(PinoLogger)));

  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  if (!process.env.NO_SERVE) {
    if (process.env.NODE_ENV === "production") {
      app.use(compression());
    }

    app.use(
      serve(process.env.RAZZLE_PUBLIC_DIR as string, {
        maxAge: process.env.NODE_ENV === "production" ? "1y" : undefined,
      })
    );
  }

  app.use(cookie());
}
