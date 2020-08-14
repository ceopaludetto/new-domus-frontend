import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";

import { Person } from "@/server/models";
import type { Mapped, ShowAll } from "@/server/utils/common.dto";

import type { PersonInsertInputWithoutRelation } from "./person.dto";

@Injectable()
export class PersonService {
  public constructor(@InjectRepository(Person) private readonly personModel: EntityRepository<Person>) {}

  public async showAll({ skip = 0, take }: ShowAll, mapped?: Mapped<Person>) {
    return this.personModel.findAll({
      offset: skip,
      limit: take,
      populate: mapped,
    });
  }

  public async findByID(id: string, mapped?: Mapped<Person>) {
    return this.personModel.findOne({ id }, mapped);
  }

  public async create(data: PersonInsertInputWithoutRelation) {
    const person = this.personModel.create(data);

    await this.personModel.persistAndFlush(person);

    return person;
  }
}
