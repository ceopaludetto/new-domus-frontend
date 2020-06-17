import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { Person } from "./person.model";
import { PersonResolver } from "./person.resolver";
import { PersonService } from "./person.service";

@Module({
  imports: [SequelizeModule.forFeature([Person])],
  providers: [PersonService, PersonResolver],
  exports: [PersonService],
})
export class PersonModule {}
