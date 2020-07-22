import { Resolver, Query, Args } from "@nestjs/graphql";

import { City } from "@/server/models";
import { ShowAll, FindByID } from "@/server/utils/common.dto";
import type { Mapped } from "@/server/utils/common.dto";
import { MapFields } from "@/server/utils/plugins/fields.plugin.decorator";

import { CityService } from "./city.service";

@Resolver(() => City)
export class CityResolver {
  public constructor(private readonly cityService: CityService) {}

  @Query(() => [City])
  public async showCities(@Args({ nullable: true }) { take, skip }: ShowAll, @MapFields(City) mapped: Mapped<City>) {
    return this.cityService.showAll({ skip, take }, mapped);
  }

  @Query(() => City)
  public async findCityByID(@Args() { id }: FindByID, @MapFields(City) mapped: Mapped<City>) {
    return this.cityService.findByID(id, mapped);
  }

  @Query(() => [City])
  public async findCitiesByStateID(@Args() { id }: FindByID, @MapFields(City) mapped: Mapped<City>) {
    return this.cityService.findByState(id, mapped);
  }
}
