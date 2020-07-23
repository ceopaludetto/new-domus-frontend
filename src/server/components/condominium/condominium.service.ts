import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Condominium } from "@/server/models";
import type { ShowAll, Mapped } from "@/server/utils/common.dto";

@Injectable()
export class CondominiumService {
  public constructor(@InjectModel(Condominium) private readonly condominiumModel: typeof Condominium) {}

  public async showAll({ skip = 0, take }: ShowAll, mapped?: Mapped) {
    return this.condominiumModel.findAll({
      offset: skip,
      limit: take,
      ...mapped,
    });
  }

  public async findByID(id: string, mapped?: Mapped) {
    return this.condominiumModel.findByPk(id, mapped);
  }
}
