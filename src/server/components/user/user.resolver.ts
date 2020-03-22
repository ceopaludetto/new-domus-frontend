import { Resolver, Query, Args } from "@nestjs/graphql";

import { User } from "@/server/models";
import { FindByID, ShowAll } from "@/server/utils/common.dto";

import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
  public constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  public async showUsers(@Args() { skip, first }: ShowAll) {
    return this.userService.showAll(skip, first);
  }

  @Query(() => User)
  public async findUser(@Args() { id }: FindByID) {
    return this.userService.findByID(id);
  }
}
