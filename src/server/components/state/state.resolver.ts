import { Resolver, Args, Query } from "@nestjs/graphql";

import { State } from "@/server/models";
import { FindByID, ShowAll } from "@/server/utils/common.dto";
import type { Mapped } from "@/server/utils/common.dto";
import { MapFields, SortFields } from "@/server/utils/plugins";

import { StateSortInput } from "./state.dto";
import { StateService } from "./state.service";

@Resolver(() => State)
export class StateResolver {
  public constructor(private readonly stateService: StateService) {}

  @Query(() => [State])
  public async showStates(
    @Args({ nullable: true }) { skip, take }: ShowAll,
    @MapFields(State) mapped: Mapped,
    @SortFields(State) sort?: StateSortInput
  ) {
    return this.stateService.showAll({ skip, take, sort: sort?.get() }, mapped);
  }

  @Query(() => State)
  public async findStateByID(@Args() { id }: FindByID, @MapFields(State) mapped: Mapped) {
    return this.stateService.findByID(id, mapped);
  }
}
