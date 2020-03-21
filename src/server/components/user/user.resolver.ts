import { Resolver, Query, Args } from "@nestjs/graphql";

import { User } from "@/server/models";
import { FindByID } from "@/server/utils/common.dto";

import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
  public constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  public async showUsers() {
    return this.userService.showAll();
  }

  @Query(() => User)
  public async findUser(@Args() { id }: FindByID) {
    return this.userService.findByID(id);
  }
}
