import { Module, Global } from "@nestjs/common";
import { resolve } from "path";

import { LoggerService } from "@/server/components/logger";

import { ConfigurationService } from "./configuration.service";

@Global()
@Module({
  providers: [
    {
      provide: ConfigurationService,
      inject: [LoggerService],
      useFactory: (logger: LoggerService) =>
        new ConfigurationService(
          resolve(
            process.env.BASE_DIR as string,
            "env",
            `config.${(process.env.DEPLOYMENT as string) || "development"}.yml`
          ),
          logger
        )
    }
  ],
  exports: [ConfigurationService]
})
export class ConfigurationModule {}
