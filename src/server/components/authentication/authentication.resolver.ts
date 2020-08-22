import { UseGuards } from "@nestjs/common";
import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";

import { UserInsertInput, UserService } from "@/server/components/user";
import { User } from "@/server/models";
import { ContextType } from "@/server/utils/common.dto";
import type { Mapped } from "@/server/utils/common.dto";
import { MapFields } from "@/server/utils/plugins";

import { AuthenticationInput, ForgotInput } from "./authentication.dto";
import { GqlAuthGuard } from "./authentication.guard";
import { AuthenticationService } from "./authentication.service";

@Resolver(() => User)
export class AuthenticationResolver {
  public constructor(private readonly authService: AuthenticationService, private readonly userService: UserService) {}

  @Mutation(() => User)
  public login(
    @Args("input") data: AuthenticationInput,
    @Context() ctx: ContextType,
    @MapFields() mapped?: Mapped<User>
  ) {
    return this.authService.login(data, ctx.res, mapped);
  }

  @Mutation(() => User)
  public register(@Args("input") data: UserInsertInput, @Context() ctx: ContextType) {
    return this.authService.register(data, ctx.res);
  }

  @Mutation(() => String)
  public forgot(@Args("input") data: ForgotInput) {
    return this.authService.forgot(data);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  public profile(@Context() ctx: ContextType, @MapFields() mapped?: Mapped<User>) {
    return this.userService.populate(ctx.req.user, mapped);
  }
}
