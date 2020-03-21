import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { User, Person } from "@/server/models";

import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  imports: [SequelizeModule.forFeature([User, Person])],
  providers: [UserResolver, UserService],
  exports: [UserService]
})
export class UserModule {}
