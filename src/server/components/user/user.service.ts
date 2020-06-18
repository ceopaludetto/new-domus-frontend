import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Queue } from "bull";

import { Person, User } from "@/server/models";
import type { ShowAll, Mapped } from "@/server/utils/common.dto";

import { UserInsertInput } from "./user.dto";

@Injectable()
export class UserService {
  public constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectQueue("mail") private readonly mailQueue: Queue
  ) {}

  public async showAll({ skip = 0, first }: ShowAll, mapped: Mapped<User>) {
    return this.userModel.findAll({
      attributes: mapped.keys(),
      offset: skip,
      limit: first,
      include: mapped.includes(),
    });
  }

  public async findByLogin(login: string, mapped: Mapped<User>) {
    return this.userModel.findOne({
      attributes: mapped.keys(),
      where: { login },
      include: mapped.includes(),
    });
  }

  public async findByID(id: string, mapped?: Mapped<User>) {
    return this.userModel.findByPk(id, {
      attributes: mapped?.keys() ?? undefined,
      include: mapped?.includes() ?? [Person],
    });
  }

  public async findByPersonID(id: string, mapped: Mapped<User>) {
    return this.userModel.findOne({
      attributes: mapped.keys(),
      where: { personID: id },
      include: mapped.includes(),
    });
  }

  public async create(data: UserInsertInput) {
    const user = await this.userModel.create(data, { include: [Person] });

    await this.mailQueue.add("register", user, {
      removeOnFail: true,
      repeat: {
        every: 1000,
        limit: 5,
      },
    });

    return user;
  }
}
