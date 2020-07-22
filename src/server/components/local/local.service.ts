import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Local } from "@/server/models";
import type { ShowAll, Mapped } from "@/server/utils/common.dto";

@Injectable()
export class LocalService {
  public constructor(@InjectModel(Local) private readonly localModel: typeof Local) {}

  public async showAll({ skip = 0, take }: ShowAll, mapped: Mapped<Local>) {
    return this.localModel.findAll({
      offset: skip,
      limit: take,
      attributes: mapped.keys(),
      include: mapped.includes(),
    });
  }

  public async findByID(id: string, mapped: Mapped<Local>) {
    return this.localModel.findByPk(id, {
      attributes: mapped.keys(),
      include: mapped.includes(),
    });
  }
}
