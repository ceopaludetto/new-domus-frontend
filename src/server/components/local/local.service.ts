import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Local } from "@/server/models";
import type { ShowAll, Mapped } from "@/server/utils/common.dto";

@Injectable()
export class LocalService {
  public constructor(@InjectModel(Local) private readonly localModel: typeof Local) {}

  public async showAll({ skip = 0, take }: ShowAll, mapped?: Mapped) {
    return this.localModel.findAll({
      offset: skip,
      limit: take,
      ...mapped,
    });
  }

  public async findByID(id: string, mapped?: Mapped) {
    return this.localModel.findByPk(id, mapped);
  }
}
