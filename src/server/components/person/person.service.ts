import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Person } from "@/server/models";

@Injectable()
export class PersonService {
  public constructor(@InjectModel(Person) private readonly personModel: typeof Person) {}

  public async showAll(skip = 0, first?: number) {
    return this.personModel.findAll({ offset: skip, limit: first });
  }

  public async findByID(id: string) {
    return this.personModel.findByPk(id);
  }
}
