import { Module, OnModuleInit } from "@nestjs/common";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

import { LocalResolver } from "./local.resolver";
import { LocalService } from "./local.service";

@Module({
  providers: [LocalResolver, LocalService],
  exports: [LocalService],
})
export class LocalModule implements OnModuleInit {
  public constructor(@InjectPinoLogger(LocalModule.name) private readonly logger: PinoLogger) {}

  public onModuleInit() {
    this.logger.info("LocalModule successfully started");
  }
}
