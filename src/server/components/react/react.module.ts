import { Module } from "@nestjs/common";

import { ReactController } from "./react.controller";
import { ReactService } from "./react.service";

@Module({
  controllers: [ReactController],
  providers: [ReactService]
})
export class ReactModule {}
