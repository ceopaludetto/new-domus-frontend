import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { EmailService } from "@/server/components/email";
import { LoggerService } from "@/server/components/logger";
import { User, Person } from "@/server/models";

import { UserInsertInput } from "./user.dto";

@Injectable()
export class UserService {
  public constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly logger: LoggerService,
    private readonly mailService: EmailService
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
    try {
      const user = await this.userModel.create(data, { include: [Person] });

      await this.mailService.sendRegisterEmail(user);

      return user;
    } catch (error) {
      this.logger.error("Falha ao criar usuário", error);
      throw error;
    }
  }
}
