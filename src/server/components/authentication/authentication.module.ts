import { Module, Global } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PinoLogger, InjectPinoLogger } from "nestjs-pino";

import { ConfigurationService } from "@/server/components/configuration";
import { UserModule } from "@/server/components/user";

import { AuthenticationResolver } from "./authentication.resolver";
import { AuthenticationService } from "./authentication.service";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      inject: [ConfigurationService],
      useFactory: async ({ auth }: ConfigurationService) => ({
        secret: auth.secret,
        signOptions: { expiresIn: "1h" },
      }),
    }),
  ],
  providers: [AuthenticationService, AuthenticationResolver, JwtStrategy],
  exports: [AuthenticationService, PassportModule],
})
export class AuthenticationModule {
  public constructor(@InjectPinoLogger(AuthenticationModule.name) private readonly logger: PinoLogger) {}

  public onModuleInit() {
    this.logger.info(`AuthenticationModule successfully started`);
  }
}
