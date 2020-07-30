import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { State } from "@/server/models";
import type { Mapped, ShowAllWithSort } from "@/server/utils/common.dto";

@Injectable()
export class StateService {
  public constructor(@InjectModel(State) private readonly stateModel: typeof State) {}

  public async showAll({ skip = 0, take, sort }: ShowAllWithSort, mapped?: Mapped) {
    return this.stateModel.findAll({
      offset: skip,
      limit: take,
      order: sort,
      ...mapped,
    });
  }

  public async findByID(id: string, mapped?: Mapped) {
    return this.stateModel.findByPk(id, mapped);
  }
}
