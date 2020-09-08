import { AuthenticationError } from "apollo-server-express";
import type { Request } from "express";

import { ACCESS_TOKEN } from "@/server/utils/constants";

export function extractor(req: Request): string {
  const accessToken = req.header(ACCESS_TOKEN);

  if (!accessToken) {
    throw new AuthenticationError("Token não encontrado");
  }

  const [bearer, token] = accessToken.split(" ");

  if (!/Bearer/.test(bearer)) {
    throw new AuthenticationError("Token mal-formatado");
  }

  return token;
}
