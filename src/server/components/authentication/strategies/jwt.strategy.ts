import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthenticationError } from "apollo-server-express";
import { Strategy } from "passport-jwt";

import { ConfigurationService } from "@/server/components/configuration";
import { UserService } from "@/server/components/user";
import { FindByID } from "@/server/utils/common.dto";

import { extractor } from "./extractor";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor({ auth }: ConfigurationService, private readonly userService: UserService) {
    super({
      jwtFromRequest: extractor,
      ignoreExpiration: false,
      secretOrKey: auth.secret,
    });
  }

  public async validate(payload: FindByID) {
    try {
      const user = await this.userService.findByID(payload.id);
      if (!user) {
        throw new AuthenticationError("Falha ao encontrar usuário");
      }

      return user;
    } catch (error) {
      throw new AuthenticationError("Falha ao encontrar usuário");
    }
  }
}
