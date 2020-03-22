import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

import { User, Person } from "@/server/models";

import { UserInput } from "./user.dto";

@Injectable()
export class UserService {
  public constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectPinoLogger(UserService.name) private readonly logger: PinoLogger
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

  public async create(data: UserInput) {
    try {
      return this.userModel.create(data, { include: [Person] });
    } catch (error) {
      this.logger.error("Falha ao criar usuário", error);
      throw error;
    }
  }
}
