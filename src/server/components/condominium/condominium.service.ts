import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { UserInputError } from "apollo-server-express";

import { Condominium } from "@/server/models";
import type { ShowAll, Mapped } from "@/server/utils/common.dto";

import type { CondominiumUpdateInput } from "./condonimium.dto";

@Injectable()
export class CondominiumService {
  public constructor(@InjectRepository(Condominium) private readonly condominiumModel: EntityRepository<Condominium>) {}

  public async showAll({ skip = 0, take }: ShowAll, mapped?: Mapped<Condominium>) {
    return this.condominiumModel.findAll({
      offset: skip,
      limit: take,
      populate: mapped,
    });
  }

  public async findByID(id: string, mapped?: Mapped<Condominium>) {
    return this.condominiumModel.findOne({ id }, mapped);
  }

  public async update(id: string, input: CondominiumUpdateInput, mapped?: Mapped<Condominium>) {
    let condominium = await this.condominiumModel.findOneOrFail({ id });

    condominium = this.condominiumModel.assign(condominium, input);

    await this.flush(condominium);

    return this.populate(condominium, mapped);
  }

  public async populate(condominium: Condominium, fields: Mapped<Condominium>) {
    if (!fields) {
      throw new UserInputError("Provide populate fields");
    }

    return this.condominiumModel.populate(condominium, fields);
  }

  public async flush(condominium: Condominium) {
    await this.condominiumModel.persistAndFlush(condominium);
  }
}
