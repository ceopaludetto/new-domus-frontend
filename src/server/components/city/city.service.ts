import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { City } from "@/server/models";
import type { Mapped, ShowAll } from "@/server/utils/common.dto";

@Injectable()
export class CityService {
  public constructor(@InjectModel(City) private readonly cityModel: typeof City) {}

  public async showAll({ skip = 0, take }: ShowAll, mapped?: Mapped) {
    return this.cityModel.findAll({
      offset: skip,
      limit: take,
      ...mapped,
    });
  }

  public async findByID(id: string, mapped?: Mapped) {
    return this.cityModel.findByPk(id, mapped);
  }

  public async findByState(stateID: string, mapped?: Mapped) {
    return this.cityModel.findAll({
      where: { stateID },
      ...mapped,
    });
  }
}
