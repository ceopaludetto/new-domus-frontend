import { Resolver, Query, Args, Mutation, Int } from "@nestjs/graphql";

import { Condominium } from "@/server/models";
import { ShowAll, FindByID } from "@/server/utils/common.dto";
import type { Mapped } from "@/server/utils/common.dto";
import { MapFields } from "@/server/utils/plugins/fields.plugin.decorator";

import { CondominiumService } from "./condominium.service";
import { CondominiumInsertInput } from "./condonimium.dto";

@Resolver(() => Condominium)
export class CondominiumResolver {
  public constructor(private readonly condominiumService: CondominiumService) {}

  @Query(() => [Condominium])
  public async showCondominiums(
    @Args({ nullable: true }) { take, skip }: ShowAll,
    @MapFields(Condominium) mapped: Mapped<Condominium>
  ) {
    return this.condominiumService.showAll({ take, skip }, mapped);
  }

  @Query(() => Condominium)
  public async findCondominiumByID(@Args() { id }: FindByID, @MapFields(Condominium) mapped: Mapped<Condominium>) {
    return this.condominiumService.findByID(id, mapped);
  }

  @Mutation(() => Int)
  public async createCondominium(@Args("input") data: CondominiumInsertInput) {
    console.log(data);
    return 10;
  }
}
