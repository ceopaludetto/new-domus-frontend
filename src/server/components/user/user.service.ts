import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Person, User, Condominium, Phone } from "@/server/models";
import type { ShowAll, Mapped, CreateOptions } from "@/server/utils/common.dto";

import { UserInsertInputWithoutRelation, UserInsertInput } from "./user.dto";

@Injectable()
export class UserService {
  public constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  public async showAll({ skip = 0, take }: ShowAll, mapped?: Mapped) {
    return this.userModel.findAll({
      offset: skip,
      limit: take,
      ...mapped,
    });
  }

  public async findByLogin(login: string, mapped?: Mapped) {
    return this.userModel.findOne({
      where: { login },
      ...mapped,
    });
  }

  public async findByID(id: string, mapped?: Mapped) {
    return this.userModel.findByPk(id, {
      attributes: mapped?.attributes,
      include: mapped?.include ?? [Person],
    });
  }

  public async findByPersonID(id: string, mapped?: Mapped) {
    return this.userModel.findOne({
      where: { personID: id },
      ...mapped,
    });
  }

  public async create(data: UserInsertInputWithoutRelation | UserInsertInput, { transaction }: CreateOptions = {}) {
    if (data instanceof UserInsertInput) {
      return this.userModel.create(data, { include: [{ model: Person, include: [Condominium, Phone] }], transaction });
    }

    return this.userModel.create(data, { transaction });
  }
}
