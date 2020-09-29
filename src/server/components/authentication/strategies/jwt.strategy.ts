import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthenticationError } from "apollo-server-express";
import { Strategy, ExtractJwt, JwtFromRequestFunction } from "passport-jwt";

import { ConfigurationService } from "@/server/components/configuration";
import { UserService } from "@/server/components/user";
import type { FindByID } from "@/server/utils/common.dto";

import { fromAccessTokenHeader } from "./extractor";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor({ auth }: ConfigurationService, private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([fromAccessTokenHeader as JwtFromRequestFunction]),
      ignoreExpiration: false,
      secretOrKey: auth.secret,
    });
  }

  public async validate(payload: FindByID) {
    const user = await this.userService.findByID(payload.id);
    if (!user) {
      throw new AuthenticationError("Falha ao encontrar usuário");
    }

    return user;
  }
}
