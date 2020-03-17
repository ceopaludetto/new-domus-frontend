import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { ConfigurationService } from "~/server/components/configuration";
import { UsuarioModule } from "~/server/components/usuario";

import { AuthenticationResolver } from "./authentication.resolver";
import { AuthenticationService } from "./authentication.service";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    UsuarioModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      inject: [ConfigurationService],
      useFactory: async ({ auth }: ConfigurationService) => ({
        secret: auth.secret,
        signOptions: { expiresIn: "1h" }
      })
    })
  ],
  providers: [AuthenticationService, AuthenticationResolver, JwtStrategy],
  exports: [AuthenticationService]
})
export class AuthenticationModule {}
