import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Person } from "@/server/models";
import type { Mapped, ShowAll, CreateOptions } from "@/server/utils/common.dto";

import { PersonInsertInputWithoutRelation } from "./person.dto";

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

  public async create(data: PersonInsertInputWithoutRelation, { transaction }: CreateOptions = {}) {
    return this.personModel.create(data, { transaction });
  }
}
