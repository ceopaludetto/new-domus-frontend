import { UseGuards } from "@nestjs/common";
import { Resolver, Args, Query, Mutation } from "@nestjs/graphql";

import { GqlAuthGuard } from "@/server/components/authentication/authentication.guard";
import { GqlCondominiumGuard, CurrentCondominium } from "@/server/components/condominium";
import { Block } from "@/server/models";
import { FindByID, ShowAll } from "@/server/utils/common.dto";
import type { Mapped } from "@/server/utils/common.dto";
import { MapFields } from "@/server/utils/plugins";

import { BlockInsertInput } from "./block.dto";
import { BlockService } from "./block.service";

@Resolver(() => Block)
export class BlockResolver {
  public constructor(private readonly blockService: BlockService) {}

  @UseGuards(GqlAuthGuard, GqlCondominiumGuard)
  @Query(() => [Block])
  public async showBlocks(
    @Args({ nullable: true }) { take, skip }: ShowAll,
    @CurrentCondominium() condominium: string,
    @MapFields() mapped?: Mapped<Block>
  ) {
    return this.blockService.showAll(condominium, { take, skip }, mapped);
  }

  @Query(() => Block)
  public async findBlockByID(@Args() { id }: FindByID, @MapFields() mapped?: Mapped<Block>) {
    return this.blockService.findByID(id, mapped);
  }

  @UseGuards(GqlAuthGuard, GqlCondominiumGuard)
  @Mutation(() => Block)
  public async createBlock(
    @Args("input") data: BlockInsertInput,
    @CurrentCondominium() condominium: string,
    @MapFields() mapped?: Mapped<Block>
  ) {
    return this.blockService.create({ ...data, condominium }, mapped);
  }
}
