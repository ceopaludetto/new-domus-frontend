import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

import type { ContextType } from "@/server/utils/common.dto";

export const CurrentCondominium = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const context = GqlExecutionContext.create(ctx);

  const { req }: ContextType = context.getContext();

  return req.condominium;
});
