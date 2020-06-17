import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import type { Mapped, ShowAll } from "@/server/utils/common.dto";

import { City } from "./city.model";

@Injectable()
export class CityService {
  public constructor(@InjectModel(City) private readonly cityModel: typeof City) {}

  public async showAll({ skip = 0, first }: ShowAll, mapped: Mapped<City>) {
    return this.cityModel.findAll({
      attributes: mapped.keys(),
      offset: skip,
      limit: first,
      include: mapped.includes(),
    });
  }

  public async findByID(id: string, mapped: Mapped<City>) {
    return this.cityModel.findByPk(id, {
      attributes: mapped.keys(),
      include: mapped.includes(),
    });
  }

  public async findByState(stateID: string, mapped: Mapped<City>) {
    return this.cityModel.findAll({
      attributes: mapped.keys(),
      where: { stateID },
      include: mapped.includes(),
    });
  }
}
