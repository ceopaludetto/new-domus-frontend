import { Resolver, Query, Args } from "@nestjs/graphql";

import { Usuario } from "@/server/models";
import { FindByID } from "@/server/utils/common.dto";

import { UsuarioService } from "./usuario.service";

@Resolver(() => Usuario)
export class UsuarioResolver {
  public constructor(private readonly usuarioService: UsuarioService) {}

  @Query(() => [Usuario])
  public async findAllUsuarios() {
    return this.usuarioService.findAll();
  }

  @Query(() => Usuario)
  public async findUsuario(@Args() { id }: FindByID) {
    return this.usuarioService.findByID(id);
  }
}
