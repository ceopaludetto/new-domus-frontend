import { UseGuards } from "@nestjs/common";
import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";

import { UserInsertInput, User } from "@/server/components/user";
import { ContextType } from "@/server/utils/common.dto";

import { AuthenticationInput } from "./authentication.dto";
import { GqlAuthGuard } from "./authentication.guard";
import { AuthenticationService } from "./authentication.service";

@Resolver(() => User)
export class AuthenticationResolver {
  public constructor(private readonly authService: AuthenticationService) {}

  @Mutation(() => User)
  public login(@Args("input") data: AuthenticationInput, @Context() ctx: ContextType) {
    return this.authService.login(data, ctx.res);
  }

  @Mutation(() => User)
  public register(@Args("input") data: UserInsertInput, @Context() ctx: ContextType) {
    return this.authService.register(data, ctx.res);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  public profile(@Context() ctx: ContextType) {
    return ctx.req.user;
  }
}
