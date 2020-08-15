import { Resolver, Query, Args } from "@nestjs/graphql";

import { User } from "@/server/models";
import { FindByID, ShowAll } from "@/server/utils/common.dto";
import type { Mapped } from "@/server/utils/common.dto";
import { MapFields, SortFields } from "@/server/utils/plugins";

import { FindUserByLogin, UserSortInput } from "./user.dto";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
  public constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  public async showUsers(
    @Args({ nullable: true }) { skip, take }: ShowAll,
    @SortFields(User) sort?: UserSortInput,
    @MapFields() mapped?: Mapped<User>
  ) {
    return this.userService.showAll({ skip, sort: sort?.get(), take }, mapped);
  }

  @Query(() => User)
  public async findUserByID(@Args() { id }: FindByID, @MapFields() mapped?: Mapped<User>) {
    return this.userService.findByID(id, mapped);
  }

  @Query(() => User)
  public async findUserByLogin(@Args() { login }: FindUserByLogin, @MapFields() mapped?: Mapped<User>) {
    return this.userService.findByLogin(login, mapped);
  }
}
