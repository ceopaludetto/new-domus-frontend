import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthenticationError } from "apollo-server-express";

import type { ContextType } from "@/server/utils/common.dto";
import { CONDOMINIUM_TOKEN } from "@/server/utils/constants";

@Injectable()
export class GqlCondominiumGuard implements CanActivate {
  public canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    const { req }: ContextType = ctx.getContext();
    const condominium = req.header(CONDOMINIUM_TOKEN);

    if (!condominium) {
      throw new AuthenticationError("Condomínio nao encontrado");
    }

    req.condominium = Array.isArray(condominium) ? condominium[0] : condominium;

    return true;
  }
}
