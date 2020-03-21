import { INestApplication, ValidationPipe } from "@nestjs/common";
import compression from "compression";
import cookie from "cookie-parser";
import { static as serve } from "express";
import helmet from "helmet";
import { Logger } from "nestjs-pino";

export function installMiddlewares(app: INestApplication) {
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  if (process.env.NODE_ENV === "production") {
    app.use(compression());
  }

  app.use(helmet());
  app.use(cookie());

  app.use(
    process.env.PUBLIC_PATH,
    serve(process.env.STATIC_FOLDER as string, {
      maxAge: process.env.NODE_ENV === "production" ? "1y" : undefined
    })
  );

  return logger;
}
