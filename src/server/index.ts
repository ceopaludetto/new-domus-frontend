import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { useContainer as installClassValidationContainer } from "class-validator";

import { installMiddlewares } from "@/server/utils/middlewares";

import { ApplicationModule } from "./app.module";
import "@/server/models";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule, { logger: false });
  installClassValidationContainer(app.select(ApplicationModule), { fallbackOnErrors: true });

  const logger = installMiddlewares(app);

  const port = process.env.PORT || 3333;
  await app.listen(port);
  logger.log(`Application started in port ${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
