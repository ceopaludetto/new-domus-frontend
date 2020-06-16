import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Queue } from "bull";

import { Person } from "@/server/components/person";
import { ShowAll } from "@/server/utils/common.dto";

import { UserInsertInput } from "./user.dto";
import { User } from "./user.model";

@Injectable()
export class UserService {
  public constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectQueue("mail") private readonly mailQueue: Queue
  ) {}

  public async showAll({ skip = 0, first }: ShowAll) {
    return this.userModel.findAll({ offset: skip, limit: first, include: [Person] });
  }

  public async findByLogin(login: string) {
    return this.userModel.findOne({ where: { login }, include: [Person] });
  }

  public async findByID(id: string) {
    return this.userModel.findByPk(id, { include: [Person] });
  }

  public async findByPersonID(id: string) {
    return this.userModel.findOne({ where: { personID: id }, include: [Person] });
  }

  public async create(data: UserInsertInput) {
    const user = await this.userModel.create(data as User, { include: [Person] });

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
