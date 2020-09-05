import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import { hash } from "bcryptjs";
import type { Queue } from "bull";
import type { Response } from "express";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { URL } from "url";

import { UserInsertInput, UserService } from "@/server/components/user";
import type { User } from "@/server/models";
import type { Mapped } from "@/server/utils/common.dto";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/server/utils/constants";

import type { AuthenticationInput, ForgotInput, ChangePasswordInput } from "./authentication.dto";

@Injectable()
export class AuthenticationService {
  public constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectQueue("mail") private readonly mailQueue: Queue,
    @InjectPinoLogger(AuthenticationService.name) private readonly logger: PinoLogger
  ) {}

  public async generateTokens(user: User) {
    return {
      accessToken: await this.jwtService.signAsync({ id: user.id }, { expiresIn: "15m" }),
      refreshToken: await this.jwtService.signAsync({ id: user.id, password: user.password }, { expiresIn: "7d" }),
    };
  }

  public sendTokensPerResponse(tokens: { accessToken: string; refreshToken: string }, res: Response) {
    res.cookie(REFRESH_TOKEN, `Bearer ${tokens.refreshToken}`, {
      sameSite: true,
      path: "/",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.setHeader(ACCESS_TOKEN, `Bearer ${tokens.accessToken}`);
  }

  public async verifyToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }

  public async getByRefreshToken(decoded: { id: string; password: string }) {
    const user = await this.userService.findByID(decoded?.id);

    if (user?.password !== decoded.password) {
      throw new AuthenticationError("Refresh token are not valid");
    }

    return user;
  }

  public async login({ login, password }: AuthenticationInput, res: Response, mapped?: Mapped<User>) {
    try {
      const user = await this.userService.findByLogin(login, mapped);
      if (!user) {
        throw new UserInputError("Usuário não encontrado", { fields: ["login"] });
      }

      if (!(await user.comparePasswords(password))) {
        throw new UserInputError("Senha incorreta", { fields: ["password"] });
      }

      this.sendTokensPerResponse(await this.generateTokens(user), res);

      return user;
    } catch (error) {
      if (error instanceof UserInputError) {
        throw error;
      }
      throw new AuthenticationError("Falha ao fazer login");
    }
  }

  public async register(data: UserInsertInput, res: Response) {
    try {
      data.password = await hash(data.password, 10);
      let user = await this.userService.create(data);

      user = await this.userService.populate(user, ["person"]);

      await this.mailQueue.add("register", user, {
        attempts: 5,
        backoff: {
          type: "fixed",
          delay: 2000,
        },
      });

      this.sendTokensPerResponse(await this.generateTokens(user), res);

      return user;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async changePassword(user: User, data: ChangePasswordInput, res: Response, mapped: Mapped<User>) {
    try {
      if (!(await user.comparePasswords(data.currentPassword))) {
        throw new UserInputError("Senha atual incorreta", { fields: ["currentPassword"] });
      }

      user.password = await hash(data.newPassword, 10);

      await this.userService.flush(user);

      this.sendTokensPerResponse(await this.generateTokens(user), res);

      return this.userService.populate(user, mapped);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async forgot(data: ForgotInput) {
    try {
      const user = await this.userService.findByLogin(data.login, ["person"]);
      const callback = new URL(data.callback);

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const token = await this.jwtService.signAsync({ id: user.id, newPassword: true }, { expiresIn: "30m" });
      callback.search = `?t=${token}`;

      // set recover token in database
      await this.userService.setRecoverToken(user, token);

      await this.mailQueue.add(
        "forgot",
        { user, callback: callback.toString() },
        {
          attempts: 5,
          backoff: {
            type: "fixed",
            delay: 2000,
          },
        }
      );

      return user.person.email;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // implement recover
}
