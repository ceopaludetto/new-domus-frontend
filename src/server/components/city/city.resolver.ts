import { Resolver, Query, Args } from "@nestjs/graphql";

import { City } from "@/server/models";
import { ShowAll, FindByID } from "@/server/utils/common.dto";
import type { Mapped } from "@/server/utils/common.dto";
import { MapFields, SortFields } from "@/server/utils/plugins";

import { CitySortInput } from "./city.dto";
import { CityService } from "./city.service";

@Resolver(() => City)
export class CityResolver {
  public constructor(private readonly cityService: CityService) {}

  @Query(() => [City])
  public async showCities(
    @Args({ nullable: true }) { take, skip }: ShowAll,
    @SortFields(City) sort?: CitySortInput,
    @MapFields(City) mapped?: Mapped
  ) {
    return this.cityService.showAll({ skip, take, sort: sort?.get() }, mapped);
  }

  @Query(() => City)
  public async findCityByID(@Args() { id }: FindByID, @MapFields(City) mapped?: Mapped) {
    return this.cityService.findByID(id, mapped);
  }

  @Query(() => [City])
  public async findCitiesByStateID(@Args() { id }: FindByID, @MapFields(City) mapped?: Mapped) {
    return this.cityService.findByState(id, mapped);
  }
}
