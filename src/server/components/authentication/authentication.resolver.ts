import { Resolver, Mutation, Args, Context } from "@nestjs/graphql";

import { UsuarioInput } from "~/server/components/usuario";
import { Usuario } from "~/server/models";
import { ContextType } from "~/server/utils/common.dto";

import { AuthenticationInput } from "./authentication.dto";
import { AuthenticationService } from "./authentication.service";

@Resolver(() => Usuario)
export class AuthenticationResolver {
  public constructor(private readonly authService: AuthenticationService) {}

  @Mutation(() => Usuario)
  public login(@Args("input") data: AuthenticationInput, @Context() ctx: ContextType) {
    return this.authService.login(data, ctx.res);
  }

  @Mutation(() => Usuario)
  public register(@Args("input") data: UsuarioInput, @Context() ctx: ContextType) {
    return this.authService.register(data, ctx.res);
  }
}
