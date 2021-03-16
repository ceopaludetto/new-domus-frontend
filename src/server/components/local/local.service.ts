import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";

import { Local } from "@/server/models";
import type { ShowAll, Mapped } from "@/server/utils/common.dto";

@Injectable()
export class LocalService {
  public constructor(@InjectRepository(Local) private readonly localModel: EntityRepository<Local>) {}

  public async showAll({ skip = 0, take }: ShowAll, mapped?: Mapped<Local>) {
    return this.localModel.findAll({
      offset: skip,
      limit: take,
      populate: mapped,
    });
  }

  public async findByID(id: string, mapped?: Mapped<Local>) {
    return this.localModel.findOne({ id }, mapped);
  }
}
