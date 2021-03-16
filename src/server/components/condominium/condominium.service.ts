import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";

import { Condominium } from "@/server/models";
import type { ShowAll, Mapped } from "@/server/utils/common.dto";

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
}
