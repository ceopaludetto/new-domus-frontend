import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { User } from "./user.model";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
