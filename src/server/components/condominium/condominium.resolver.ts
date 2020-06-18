import { Resolver, Query, Args } from "@nestjs/graphql";

import { Condominium } from "@/server/models";
import { ShowAll, FindByID } from "@/server/utils/common.dto";
import type { Mapped } from "@/server/utils/common.dto";
import { MapFields } from "@/server/utils/plugins/fields.plugin.decorator";

import { CondominiumService } from "./condominium.service";

@Resolver(() => Condominium)
export class CondominiumResolver {
  public constructor(private readonly condominiumService: CondominiumService) {}

  @Query(() => [Condominium])
  public async showCondominiums(@Args() { first, skip }: ShowAll, @MapFields(Condominium) mapped: Mapped<Condominium>) {
    return this.condominiumService.showAll({ first, skip }, mapped);
  }

  @Query(() => Condominium)
  public async findCondominiumByID(@Args() { id }: FindByID, @MapFields(Condominium) mapped: Mapped<Condominium>) {
    return this.condominiumService.findByID(id, mapped);
  }
}
