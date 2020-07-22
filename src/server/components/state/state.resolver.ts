import { Resolver, Args, Query } from "@nestjs/graphql";

import { State } from "@/server/models";
import { FindByID, ShowAll } from "@/server/utils/common.dto";
import type { Mapped } from "@/server/utils/common.dto";
import { MapFields } from "@/server/utils/plugins/fields.plugin.decorator";

import { StateSortArgs } from "./state.dto";
import { StateService } from "./state.service";

@Resolver(() => State)
export class StateResolver {
  public constructor(private readonly stateService: StateService) {}

  @Query(() => [State])
  public async showStates(
    @MapFields(State) mapped: Mapped<State>,
    @Args() { skip, take }: ShowAll,
    @Args("sort", { nullable: true }) sort?: StateSortArgs
  ) {
    return this.stateService.showAll({ skip, take, sort }, mapped);
  }

  @Query(() => State)
  public async findStateByID(@Args() { id }: FindByID, @MapFields(State) mapped: Mapped<State>) {
    return this.stateService.findByID(id, mapped);
  }
}
