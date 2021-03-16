import { Module, NestModule, OnModuleInit, MiddlewareConsumer } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import compression from "compression";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

import { AuthenticationModule } from "@/server/components/authentication";
import { SchemaModule } from "@/server/components/schema";

import { ReactController } from "./react.controller";
import { ReactService } from "./react.service";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: process.env.RAZZLE_PUBLIC_DIR as string,
    }),
    AuthenticationModule,
    SchemaModule,
  ],
  controllers: [ReactController],
  providers: [ReactService],
})
export class ReactModule implements OnModuleInit, NestModule {
  public constructor(@InjectPinoLogger(ReactModule.name) private readonly logger: PinoLogger) {}

  public onModuleInit() {
    this.logger.info("ReactModule successfully started");
    if (!process.env.NO_SERVE) {
      this.logger.info(`Serving ${process.env.RAZZLE_PUBLIC_DIR as string} folder`);
    }
  }

  public configure(consumer: MiddlewareConsumer) {
    if (process.env.NODE_ENV === "production") {
      consumer.apply(compression()).forRoutes(ReactController);
    }
  }
}
