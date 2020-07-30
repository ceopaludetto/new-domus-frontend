import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { City } from "@/server/models";

import { CityResolver } from "./city.resolver";
import { CityService } from "./city.service";

@Module({
  imports: [SequelizeModule.forFeature([City])],
  providers: [CityService, CityResolver],
  exports: [CityService],
})
export class CityModule {}
