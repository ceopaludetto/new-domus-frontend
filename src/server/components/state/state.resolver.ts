import { Resolver, ResolveField, Args, Query, Parent } from "@nestjs/graphql";

import { FindByID, ShowAll } from "@/server/utils/common.dto";

import { State } from "./state.model";
import { StateService } from "./state.service";

@Resolver(() => State)
export class StateResolver {
  public constructor(private readonly stateService: StateService) {}

  @Query(() => [State])
  public async showStates(@Args() { skip, first }: ShowAll) {
    return this.stateService.showAll(skip, first);
  }

  @Query(() => State)
  public async findStateByID(@Args() { id }: FindByID) {
    return this.stateService.findByID(id);
  }

  @ResolveField()
  public async cities(@Parent() state: State) {
    if (!state.cities) {
      return state.$get("cities");
    }
    return state.cities;
  }
}
