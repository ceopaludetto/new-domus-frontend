import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import { Response } from "express";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

import { UserInsertInput, UserService } from "@/server/components/user";
import { User } from "@/server/models";

import { AuthenticationInput } from "./authentication.dto";

@Injectable()
export class AuthenticationService {
  public constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectPinoLogger(AuthenticationService.name) private readonly logger: PinoLogger
  ) {}

  private async generate(user: User) {
    return this.jwtService.sign({ id: user.id });
  }

  public async login({ login, password }: AuthenticationInput, res: Response) {
    try {
      const user = await this.userService.findByLogin(login);
      if (!user) {
        throw new UserInputError("Usuário não encontrado", { field: "email" });
      }

      if (!(await user.comparePasswords(password))) {
        throw new UserInputError("Senha incorreta", { field: "password" });
      }

      res.cookie("auth", `Bearer ${await this.generate(user)}`);

      return user;
    } catch (error) {
      throw new AuthenticationError("Falha ao fazer login");
    }
  }

  public async register(data: UserInsertInput, res: Response) {
    try {
      const user = await this.userService.create(data);

      res.cookie("auth", `Bearer ${await this.generate(user)}`);

      return user;
    } catch (error) {
      this.logger.error(error);
      throw new AuthenticationError("Falha ao cadastrar usuário");
    }
  }
}
