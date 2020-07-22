import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Condominium } from "@/server/models";
import type { ShowAll, Mapped } from "@/server/utils/common.dto";

@Injectable()
export class CondominiumService {
  public constructor(@InjectModel(Condominium) private readonly condominiumModel: typeof Condominium) {}

  public async showAll({ skip = 0, take }: ShowAll, mapped: Mapped<Condominium>) {
    return this.condominiumModel.findAll({
      offset: skip,
      limit: take,
      attributes: mapped.keys(),
      include: mapped.includes(),
    });
  }

  public async findByID(id: string, mapped: Mapped<Condominium>) {
    return this.condominiumModel.findByPk(id, { attributes: mapped.keys(), include: mapped.includes() });
  }
}
