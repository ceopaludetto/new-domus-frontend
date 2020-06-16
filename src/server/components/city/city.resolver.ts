import { Resolver, Query, Args, ResolveField, Parent } from "@nestjs/graphql";

import { ShowAll, FindByID } from "@/server/utils/common.dto";

import { City } from "./city.model";
import { CityService } from "./city.service";

@Resolver(() => City)
export class CityResolver {
  public constructor(private readonly cityService: CityService) {}

  @Query(() => [City])
  public async showCities(@Args() { first, skip }: ShowAll) {
    return this.cityService.showAll(skip, first);
  }

  @Query(() => City)
  public async findCityByID(@Args() { id }: FindByID) {
    return this.cityService.findByID(id);
  }

  @Query(() => [City])
  public async findCitiesByStateID(@Args() { id }: FindByID) {
    return this.cityService.findByState(id);
  }

  @ResolveField()
  public async state(@Parent() city: City) {
    if (!city.state) {
      return city.$get("state");
    }

    return city.state;
  }
}
