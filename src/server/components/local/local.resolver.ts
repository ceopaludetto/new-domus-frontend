import { Resolver, Query, Args } from "@nestjs/graphql";

import { Local } from "@/server/models";
import { ShowAll, FindByID } from "@/server/utils/common.dto";
import type { Mapped } from "@/server/utils/common.dto";
import { MapFields } from "@/server/utils/plugins/fields.plugin.decorator";

import { LocalService } from "./local.service";

@Resolver(() => Local)
export class LocalResolver {
  public constructor(private readonly localService: LocalService) {}

  @Query(() => [Local])
  public showLocals(@Args() { take, skip }: ShowAll, @MapFields(Local) mapped: Mapped<Local>) {
    return this.localService.showAll({ take, skip }, mapped);
  }

  @Query(() => Local)
  public findLocalByID(@Args() { id }: FindByID, @MapFields(Local) mapped: Mapped<Local>) {
    return this.localService.findByID(id, mapped);
  }
}
