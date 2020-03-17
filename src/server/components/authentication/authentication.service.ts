import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserInputError } from "apollo-server-express";
import { Response } from "express";

import { UsuarioInput, UsuarioService } from "~/server/components/usuario";
import { Usuario } from "~/server/models";

import { AuthenticationInput } from "./authentication.dto";

@Injectable()
export class AuthenticationService {
  public constructor(private readonly usuarioService: UsuarioService, private readonly jwtService: JwtService) {}

  private async generate(user: Usuario) {
    return this.jwtService.sign({ id: user.id });
  }

  public async login({ email, password }: AuthenticationInput, res: Response) {
    const user = await this.usuarioService.fingByEmail(email);
    if (!user) {
      throw new UserInputError("Usuário não encontrado", { field: "email" });
    }

    if (!(await user.comparePasswords(password))) {
      throw new UserInputError("Senha incorreta", { field: "password" });
    }

    res.cookie("auth", await this.generate(user));

    return user;
  }

  public async register(data: UsuarioInput, res: Response) {
    const user = await this.usuarioService.create(data);

    res.cookie("auth", await this.generate(user));

    return user;
  }
}
