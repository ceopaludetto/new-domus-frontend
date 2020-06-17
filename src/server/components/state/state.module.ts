import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { State } from "./state.model";
import { StateResolver } from "./state.resolver";
import { StateService } from "./state.service";

@Module({
  imports: [SequelizeModule.forFeature([State])],
  providers: [StateService, StateResolver],
  exports: [StateService],
})
export class StateModule {}
