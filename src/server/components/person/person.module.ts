import { Module, OnModuleInit } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

import { Person } from "@/server/models";

import { PersonResolver } from "./person.resolver";
import { PersonService } from "./person.service";

@Module({
  imports: [SequelizeModule.forFeature([Person])],
  providers: [PersonService, PersonResolver],
  exports: [PersonService],
})
export class PersonModule implements OnModuleInit {
  public constructor(@InjectPinoLogger(PersonModule.name) private readonly logger: PinoLogger) {}

  public onModuleInit() {
    this.logger.info("PersonModule successfully started");
  }
}
