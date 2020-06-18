import { Module, Global, OnModuleInit } from "@nestjs/common";
import { PinoLogger, InjectPinoLogger } from "nestjs-pino";
import { resolve } from "path";

import { ConfigurationService } from "./configuration.service";

@Global()
@Module({
  providers: [
    {
      provide: ConfigurationService,
      inject: [PinoLogger],
      useFactory: (logger: PinoLogger) =>
        new ConfigurationService(
          resolve(
            process.env.BASE_DIR as string,
            "env",
            `config.${(process.env.DEPLOYMENT as string) || "development"}.yml`
          ),
          logger
        ),
    },
  ],
  exports: [ConfigurationService],
})
export class ConfigurationModule implements OnModuleInit {
  public constructor(@InjectPinoLogger(ConfigurationModule.name) private readonly logger: PinoLogger) {}

  public onModuleInit() {
    this.logger.info(`ConfigurationModule successfully started`);
  }
}
