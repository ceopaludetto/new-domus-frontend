import { Module, Global, OnModuleInit } from "@nestjs/common";
import { PinoLogger, InjectPinoLogger } from "nestjs-pino";

import { ConfigurationService } from "./configuration.service";

@Global()
@Module({
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule implements OnModuleInit {
  public constructor(@InjectPinoLogger(ConfigurationModule.name) private readonly logger: PinoLogger) {}

  public onModuleInit() {
    this.logger.info(`ConfigurationModule successfully started`);
  }
}
