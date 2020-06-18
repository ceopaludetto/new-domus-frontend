import { Module, OnModuleInit } from "@nestjs/common";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

import { ReactController } from "./react.controller";
import { ReactService } from "./react.service";

@Module({
  controllers: [ReactController],
  providers: [ReactService],
})
export class ReactModule implements OnModuleInit {
  public constructor(@InjectPinoLogger(ReactModule.name) private readonly logger: PinoLogger) {}

  public onModuleInit() {
    this.logger.info("ReactModule successfully started");
  }
}
