import { UseGuards } from "@nestjs/common";
import { Resolver, Mutation, Context } from "@nestjs/graphql";

import { GqlAuthGuard } from "@/server/components/authentication/authentication.guard";
import { Settings } from "@/server/models";
import type { ContextType, Mapped } from "@/server/utils/common.dto";
import { MapFields } from "@/server/utils/plugins";

import { SettingsService } from "./settings.service";

@Resolver(() => Settings)
export class SettingsResolver {
  public constructor(private readonly settingsService: SettingsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Settings)
  public async toggleTheme(@Context() ctx: ContextType, @MapFields() mapped?: Mapped<Settings>) {
    return this.settingsService.toggleTheme(ctx.req.user.settings, mapped);
  }
}
