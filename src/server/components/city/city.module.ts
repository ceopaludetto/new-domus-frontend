import { Module, OnModuleInit } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

import { City } from "@/server/models";

import { CityResolver } from "./city.resolver";
import { CityService } from "./city.service";

@Module({
  imports: [SequelizeModule.forFeature([City])],
  providers: [CityService, CityResolver],
  exports: [CityService],
})
export class CityModule implements OnModuleInit {
  public constructor(@InjectPinoLogger(CityModule.name) private readonly logger: PinoLogger) {}

  public onModuleInit() {
    this.logger.info(`CityModule successfully started`);
  }
}
