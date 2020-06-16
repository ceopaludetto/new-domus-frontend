import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { State } from "@/server/components/state";

import { City } from "./city.model";

@Injectable()
export class CityService {
  public constructor(@InjectModel(City) private readonly cityModel: typeof City) {}

  public async showAll(skip = 0, first?: number) {
    return this.cityModel.findAll({ offset: skip, limit: first, include: [State] });
  }

  public async findByID(id: string) {
    return this.cityModel.findByPk(id);
  }

  public async findByState(stateID: string) {
    return this.cityModel.findAll({ where: { stateID }, include: [State] });
  }
}
