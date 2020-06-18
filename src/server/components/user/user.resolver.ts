import { Resolver, Query, Args } from "@nestjs/graphql";

import { User } from "@/server/models";
import { FindByID, ShowAll } from "@/server/utils/common.dto";
import type { Mapped } from "@/server/utils/common.dto";
import { MapFields } from "@/server/utils/plugins/fields.plugin.decorator";

import { FindUserByLogin } from "./user.dto";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
  public constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  public async showUsers(@Args() { skip, first }: ShowAll, @MapFields(User) mapped: Mapped<User>) {
    return this.userService.showAll({ skip, first }, mapped);
  }

  @Query(() => User)
  public async findUserByID(@Args() { id }: FindByID, @MapFields(User) mapped: Mapped<User>) {
    return this.userService.findByID(id, mapped);
  }

  @Query(() => User)
  public async findUserByLogin(@Args() { login }: FindUserByLogin, @MapFields(User) mapped: Mapped<User>) {
    return this.userService.findByLogin(login, mapped);
  }
}
