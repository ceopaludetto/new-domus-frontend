import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Queue } from "bull";

import { User, Person } from "@/server/models";

import { UserInsertInput } from "./user.dto";

@Injectable()
export class UserService {
  public constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectQueue("mail") private readonly mailQueue: Queue
  ) {}

  public async showAll(skip = 0, first?: number) {
    return this.userModel.findAll({ offset: skip, limit: first });
  }

  public async findByLogin(login: string) {
    return this.userModel.findOne({ where: { login } });
  }

  public async findByID(id: string) {
    return this.userModel.findByPk(id);
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
