import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module, OnModuleInit } from "@nestjs/common";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

import { State } from "@/server/models";

import { StateResolver } from "./state.resolver";
import { StateService } from "./state.service";

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [State] })],
  providers: [StateService, StateResolver],
  exports: [StateService],
})
export class StateModule implements OnModuleInit {
  public constructor(@InjectPinoLogger(StateModule.name) private readonly logger: PinoLogger) {}

  public onModuleInit() {
    this.logger.info("StateModule successfully started");
  }
}
