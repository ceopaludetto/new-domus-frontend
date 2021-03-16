// import { AuthenticationError } from "apollo-server-express";
import type { Request } from "express";

import { ACCESS_TOKEN } from "@/server/utils/constants";

export function fromAccessTokenHeader(req: Request) {
  const accessToken = req.header(ACCESS_TOKEN) ?? "";

  const [, token] = accessToken.split(" ");

  return token;
}
