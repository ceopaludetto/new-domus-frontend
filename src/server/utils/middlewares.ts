import { INestApplication, ValidationPipe } from "@nestjs/common";
import { UserInputError } from "apollo-server-express";
import compression from "compression";
import cookie from "cookie-parser";
import csurf from "csurf";
import { static as serve } from "express";
import helmet from "helmet";
import { PinoLogger } from "nestjs-pino";

import { LoggingInterceptor } from "./plugins/logging.interceptor";
import { SequelizeExceptionFilter } from "./plugins/sequelize.exception.filter";
import { formatErrors } from "./validations/format";

export async function installMiddlewares(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => new UserInputError("Erro de validação", formatErrors(errors)),
    })
  );
  app.useGlobalFilters(new SequelizeExceptionFilter());
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
      `${process.env.PUBLIC_URL as string}/`,
      serve(process.env.STATIC_FOLDER as string, {
        maxAge: process.env.NODE_ENV === "production" ? "1y" : undefined,
      })
    );
  }

  app.use(cookie());
  if (process.env.NODE_ENV === "production") {
    app.use(csurf({ cookie: { sameSite: "lax", httpOnly: true }, value: (req) => req.cookies["X-XSRF-TOKEN"] }));
  }
}
