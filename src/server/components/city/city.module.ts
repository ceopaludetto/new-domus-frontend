import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module, OnModuleInit } from "@nestjs/common";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

import { City } from "@/server/models";

import { CityResolver } from "./city.resolver";
import { CityService } from "./city.service";

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [City] })],
  providers: [CityService, CityResolver],
  exports: [CityService],
})
export class CityModule implements OnModuleInit {
  public constructor(@InjectPinoLogger(CityModule.name) private readonly logger: PinoLogger) {}

  public onModuleInit() {
    this.logger.info(`CityModule successfully started`);
  }
}
