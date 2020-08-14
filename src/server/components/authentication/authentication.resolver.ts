import { UseGuards } from "@nestjs/common";
import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";

import { UserInsertInput } from "@/server/components/user";
import { User } from "@/server/models";
import type { ContextType, Mapped } from "@/server/utils/common.dto";
import { MapFields } from "@/server/utils/plugins";

import { AuthenticationInput, ForgotInput } from "./authentication.dto";
import { GqlAuthGuard } from "./authentication.guard";
import { AuthenticationService } from "./authentication.service";

@Resolver(() => User)
export class AuthenticationResolver {
  public constructor(private readonly authService: AuthenticationService) {}

  @Mutation(() => User)
  public login(
    @Args("input") data: AuthenticationInput,
    @Context() ctx: ContextType,
    @MapFields(User, { password: true }) mapped?: Mapped
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
  public profile(@Context() ctx: ContextType) {
    return ctx.req.user;
  }
}
