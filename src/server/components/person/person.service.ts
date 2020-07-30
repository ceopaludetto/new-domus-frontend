import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Person } from "@/server/models";
import type { Mapped, ShowAll } from "@/server/utils/common.dto";

@Injectable()
export class PersonService {
  public constructor(@InjectModel(Person) private readonly personModel: typeof Person) {}

  public async showAll({ skip = 0, take }: ShowAll, mapped?: Mapped) {
    return this.personModel.findAll({
      offset: skip,
      limit: take,
      ...mapped,
    });
  }

  public async findByID(id: string, mapped?: Mapped) {
    return this.personModel.findByPk(id, mapped);
  }
}
