import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Usuario } from "~/models";

import { UsuarioInput } from "./usuario.dto";

@Injectable()
export class UsuarioService {
  public constructor(@InjectModel(Usuario) private readonly usuarioModel: typeof Usuario) {}

  public async findAll() {
    return this.usuarioModel.findAll();
  }

  public async fingByEmail(email: string) {
    return this.usuarioModel.findOne({ where: { email } });
  }

  public async findByID(id: string) {
    return this.usuarioModel.findByPk(id);
  }

  public async create(data: UsuarioInput) {
    return this.usuarioModel.create(data);
  }
}
