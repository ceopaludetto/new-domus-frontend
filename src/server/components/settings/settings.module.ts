import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { Settings } from "@/server/models";

import { SettingsResolver } from "./settings.resolver";
import { SettingsService } from "./settings.service";

@Module({
  imports: [MikroOrmModule.forFeature([Settings])],
  providers: [SettingsResolver, SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
