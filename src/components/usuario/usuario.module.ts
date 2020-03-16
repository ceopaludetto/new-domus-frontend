import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { Usuario } from "~/models";

import { UsuarioResolver } from "./usuario.resolver";
import { UsuarioService } from "./usuario.service";

@Module({
  imports: [SequelizeModule.forFeature([Usuario])],
  providers: [UsuarioResolver, UsuarioService],
  exports: [UsuarioService]
})
export class UsuarioModule {}
