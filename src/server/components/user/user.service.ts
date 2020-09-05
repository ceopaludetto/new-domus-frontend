import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { UserInputError } from "apollo-server-express";

import { User } from "@/server/models";
import type { Mapped, ShowAllWithSort } from "@/server/utils/common.dto";

import type { UserInsertInput } from "./user.dto";

@Injectable()
export class UserService {
  public constructor(@InjectRepository(User) private readonly userModel: EntityRepository<User>) {}

  public async showAll({ skip = 0, sort, take }: ShowAllWithSort, mapped?: Mapped<User>) {
    return this.userModel.findAll({
      offset: skip,
      limit: take,
      orderBy: sort,
      populate: mapped,
    });
  }

  public async findByLogin(login: string, mapped?: Mapped<User>) {
    return this.userModel.findOne({ login }, mapped);
  }

  public async findByID(id: string, mapped?: Mapped<User>) {
    return this.userModel.findOne({ id }, mapped);
  }

  public async findByPersonID(id: string, mapped?: Mapped<User>) {
    return this.userModel.findOne({ person: { id } }, mapped);
  }

  public async create(data: UserInsertInput) {
    const user = this.userModel.create(data);

    await this.flush(user);

    return user;
  }

  public async populate(user: User, fields: Mapped<User>) {
    if (!fields) {
      throw new UserInputError("Provide populate fields");
    }

    return this.userModel.populate(user, fields);
  }

  public async setRecoverToken(user: User, token: string) {
    user.recoverToken = token;

    await this.flush(user);

    return user;
  }

  public async flush(user: User) {
    await this.userModel.persistAndFlush(user);
  }
}
