import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { User } from "@/server/components/user";

import { Person } from "./person.model";

@Injectable()
export class PersonService {
  public constructor(@InjectModel(Person) private readonly personModel: typeof Person) {}

  public async showAll(skip = 0, first?: number) {
    return this.personModel.findAll({ offset: skip, limit: first, include: [User] });
  }

  public async findByID(id: string) {
    return this.personModel.findByPk(id, { include: [User] });
  }
}
