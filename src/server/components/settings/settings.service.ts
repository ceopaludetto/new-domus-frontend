import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { UserInputError } from "apollo-server-express";

import { Settings } from "@/server/models";
import type { Mapped } from "@/server/utils/common.dto";
import { Theme } from "@/server/utils/enums";

@Injectable()
export class SettingsService {
  public constructor(@InjectRepository(Settings) private readonly settingsModel: EntityRepository<Settings>) {}

  public async toggleTheme(settings: Settings, mapped?: Mapped<Settings>) {
    const find = await this.settingsModel.findOne({ id: settings.id });

    if (!find) {
      throw new UserInputError("Settings not found");
    }

    find.theme = find.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;

    await this.flush(find);

    return this.populate(find, mapped);
  }

  public async populate(settings: Settings, fields: Mapped<Settings>) {
    if (!fields) {
      throw new UserInputError("Provide populate fields");
    }

    return this.settingsModel.populate(settings, fields);
  }

  public async flush(settings: Settings) {
    await this.settingsModel.persistAndFlush(settings);
  }
}
