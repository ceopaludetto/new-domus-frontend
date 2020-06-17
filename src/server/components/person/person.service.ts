import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import type { Mapped, ShowAll } from "@/server/utils/common.dto";

import { Person } from "./person.model";

@Injectable()
export class PersonService {
  public constructor(@InjectModel(Person) private readonly personModel: typeof Person) {}

  public async showAll({ skip = 0, first }: ShowAll, mapped: Mapped<Person>) {
    return this.personModel.findAll({
      attributes: mapped.keys(),
      offset: skip,
      limit: first,
      include: mapped.includes(),
    });
  }

  public async findByID(id: string, mapped: Mapped<Person>) {
    return this.personModel.findByPk(id, { attributes: mapped.keys(), include: mapped.includes() });
  }
}
