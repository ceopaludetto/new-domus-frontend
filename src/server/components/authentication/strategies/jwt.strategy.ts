import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";

import { ConfigurationService } from "@/server/components/configuration";

import { extractor } from "./extractor";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor({ auth }: ConfigurationService) {
    super({
      jwtFromRequest: extractor,
      ignoreExpiration: false,
      secretOrKey: auth.secret
    });
  }

  // eslint-disable-next-line
  public async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
