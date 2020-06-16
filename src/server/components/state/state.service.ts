import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { City } from "@/server/components/city";

import { State } from "./state.model";

@Injectable()
export class StateService {
  public constructor(@InjectModel(State) private readonly stateModel: typeof State) {}

  public async showAll(skip = 0, first?: number) {
    return this.stateModel.findAll({ offset: skip, limit: first, include: [City] });
  }

  public async findByID(id: string) {
    return this.stateModel.findByPk(id, { include: [City] });
  }
}
