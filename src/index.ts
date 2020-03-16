import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { useContainer } from "class-validator";

import { installMiddlewares } from "~/utils/middlewares";

import { ApplicationModule } from "./app.module";
import "~/models";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule, { logger: false });
  useContainer(app.select(ApplicationModule), { fallbackOnErrors: true });

  const logger = installMiddlewares(app);

  try {
    const port = process.env.PORT || 3333;
    await app.listen(port);
    logger.log(`Application started in port ${port}`);
  } catch (error) {
    logger.error("Fail to open server", error);
  }

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
