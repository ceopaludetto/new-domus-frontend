import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";

import { City } from "@/server/models";
import type { Mapped, ShowAllWithSort } from "@/server/utils/common.dto";

@Injectable()
export class CityService {
  public constructor(@InjectRepository(City) private readonly cityModel: EntityRepository<City>) {}

  public async showAll({ skip = 0, take, sort }: ShowAllWithSort, mapped?: Mapped<City>) {
    return this.cityModel.findAll({
      offset: skip,
      limit: take,
      orderBy: sort,
      populate: mapped,
    });
  }

  public async findByID(id: string, mapped?: Mapped<City>) {
    return this.cityModel.findOne({ id }, mapped);
  }

  public async findByState(stateID: string, mapped?: Mapped<City>) {
    return this.cityModel.find(
      {
        state: { id: stateID },
      },
      {
        populate: mapped,
      }
    );
  }
}
