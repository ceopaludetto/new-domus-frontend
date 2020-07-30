import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { InjectModel, InjectConnection } from "@nestjs/sequelize";
import { Queue } from "bull";
import { Sequelize } from "sequelize";

import { Person, User, Phone, Condominium, Address } from "@/server/models";
import type { ShowAll, Mapped } from "@/server/utils/common.dto";

import { UserInsertInput } from "./user.dto";

@Injectable()
export class UserService {
  public constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectQueue("mail") private readonly mailQueue: Queue,
    @InjectConnection() private readonly sequelize: Sequelize
  ) {}

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

  public async create(data: UserInsertInput) {
    const transaction = await this.sequelize.transaction();
    try {
      const user = await this.userModel.create(data, {
        include: [
          {
            model: Person,
            include: [
              Phone,
              {
                model: Condominium,
                include: [Address],
              },
            ],
          },
        ],
        transaction,
      });

      await this.mailQueue.add("register", user, {
        removeOnFail: true,
        repeat: {
          every: 1000,
          limit: 5,
        },
      });

      await transaction.commit();

      return user;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
