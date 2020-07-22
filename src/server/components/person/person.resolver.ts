import { Resolver, Query, Args } from "@nestjs/graphql";

import { Person } from "@/server/models";
import { FindByID, ShowAll } from "@/server/utils/common.dto";
import type { Mapped } from "@/server/utils/common.dto";
import { MapFields } from "@/server/utils/plugins/fields.plugin.decorator";

import { PersonService } from "./person.service";

@Resolver(() => Person)
export class PersonResolver {
  public constructor(private readonly personService: PersonService) {}

  @Query(() => [Person])
  public async showPeople(@Args() { skip, take }: ShowAll, @MapFields(Person) mapped: Mapped<Person>) {
    return this.personService.showAll({ skip, take }, mapped);
  }

  @Query(() => Person)
  public async findPersonByID(@Args() { id }: FindByID, @MapFields(Person) mapped: Mapped<Person>) {
    return this.personService.findByID(id, mapped);
  }
}
