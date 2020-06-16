import { Resolver, Query, Args, ResolveField, Parent } from "@nestjs/graphql";

import { FindByID, ShowAll } from "@/server/utils/common.dto";

import { FindUserByLogin } from "./user.dto";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
  public constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  public async showUsers(@Args() { skip, first }: ShowAll) {
    return this.userService.showAll({ skip, first });
  }

  @Query(() => User)
  public async findUserByID(@Args() { id }: FindByID) {
    return this.userService.findByID(id);
  }

  @Query(() => User)
  public async findUserByLogin(@Args() { login }: FindUserByLogin) {
    return this.userService.findByLogin(login);
  }

  @ResolveField()
  public async person(@Parent() user: User) {
    if (!user.person) {
      return user.$get("person");
    }
    return user.person;
  }
}
