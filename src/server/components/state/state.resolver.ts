import { Resolver, Args, Query } from "@nestjs/graphql";

import { FindByID, ShowAll } from "@/server/utils/common.dto";
import type { Mapped } from "@/server/utils/common.dto";
import { MapFields } from "@/server/utils/plugins/fields.plugin.decorator";

import { State } from "./state.model";
import { StateService } from "./state.service";

@Resolver(() => State)
export class StateResolver {
  public constructor(private readonly stateService: StateService) {}

  @Query(() => [State])
  public async showStates(@Args() { skip, first }: ShowAll, @MapFields(State) mapped: Mapped<State>) {
    return this.stateService.showAll({ skip, first }, mapped);
  }

  @Query(() => State)
  public async findStateByID(@Args() { id }: FindByID, @MapFields(State) mapped: Mapped<State>) {
    return this.stateService.findByID(id, mapped);
  }
}
