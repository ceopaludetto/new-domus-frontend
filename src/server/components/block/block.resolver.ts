import { UseGuards } from "@nestjs/common";
import { Resolver, Args, Query, Mutation, Context } from "@nestjs/graphql";

import { GqlAuthGuard } from "@/server/components/authentication/authentication.guard";
import { GqlCondominiumGuard } from "@/server/components/condominium/condominium.guard";
import { Block } from "@/server/models";
import { FindByID, Mapped, ShowAll, ContextType } from "@/server/utils/common.dto";
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
    @Context() { req }: ContextType,
    @MapFields() mapped?: Mapped<Block>
  ) {
    return this.blockService.showAll(req.condominium, { take, skip }, mapped);
  }

  @Query(() => Block)
  public async findBlockByID(@Args() { id }: FindByID, @MapFields() mapped?: Mapped<Block>) {
    return this.blockService.findByID(id, mapped);
  }

  @UseGuards(GqlAuthGuard, GqlCondominiumGuard)
  @Mutation(() => Block)
  public async createBlock(
    @Args("input") data: BlockInsertInput,
    @Context() { req }: ContextType,
    @MapFields() mapped?: Mapped<Block>
  ) {
    return this.blockService.create({ ...data, condominium: req.condominium }, mapped);
  }
}
