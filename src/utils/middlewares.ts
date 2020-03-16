import { INestApplication, ValidationPipe } from "@nestjs/common";
import cookie from "cookie-parser";
import helmet from "helmet";
import { Logger } from "nestjs-pino";

export function installMiddlewares(app: INestApplication) {
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  app.use(helmet());
  app.use(cookie());

  return logger;
}
