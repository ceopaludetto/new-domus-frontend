import { Injectable } from "@nestjs/common";
import { InjectModel, InjectConnection } from "@nestjs/sequelize";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Sequelize } from "sequelize-typescript";

import { User, Person } from "@/server/models";

import { UserInput } from "./user.dto";

@Injectable()
export class UserService {
  public constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Person) private readonly personModel: typeof Person,
    @InjectConnection() private readonly sequelize: Sequelize,
    @InjectPinoLogger(UserService.name) private readonly logger: PinoLogger
  ) {}

  public async showAll() {
    return this.userModel.findAll();
  }

  public async findByLogin(login: string) {
    return this.userModel.findOne({ where: { login } });
  }

  public async findByID(id: string) {
    return this.userModel.findByPk(id);
  }

  public async create({ person, ...rest }: UserInput) {
    const transaction = await this.sequelize.transaction();
    try {
      const p = await this.personModel.create(person, { transaction });

      const u = await this.userModel.create({ ...rest, personID: p.id }, { transaction });
      u.person = p;

      await transaction.commit();

      return u;
    } catch (error) {
      transaction.rollback();
      this.logger.error("Falha ao criar usuário", error);
      throw error;
    }
  }
}
