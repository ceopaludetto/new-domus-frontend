import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";

import { State } from "@/server/models";
import type { Mapped, ShowAllWithSort } from "@/server/utils/common.dto";

@Injectable()
export class StateService {
  public constructor(@InjectRepository(State) private readonly stateModel: EntityRepository<State>) {}

  public async showAll({ skip = 0, take, sort }: ShowAllWithSort, mapped?: Mapped<State>) {
    return this.stateModel.findAll({
      offset: skip,
      limit: take,
      orderBy: sort,
      populate: mapped,
    });
  }

  public async findByID(id: string, mapped?: Mapped<State>) {
    return this.stateModel.findOne({ id }, mapped);
  }
}
