import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { State } from "@/server/models";
import type { Mapped, ShowAllWithSort } from "@/server/utils/common.dto";

@Injectable()
export class StateService {
  public constructor(@InjectModel(State) private readonly stateModel: typeof State) {}

  public async showAll({ skip = 0, take, sort }: ShowAllWithSort<State, "name">, mapped: Mapped<State>) {
    return this.stateModel.findAll({
      attributes: mapped.keys(),
      offset: skip,
      limit: take,
      order: Object.entries(sort ?? {}) as [],
      include: mapped.includes(),
    });
  }

  public async findByID(id: string, mapped: Mapped<State>) {
    return this.stateModel.findByPk(id, { attributes: mapped.keys(), include: mapped.includes() });
  }
}
