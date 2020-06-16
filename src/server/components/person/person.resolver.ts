import { Resolver, Query, Args, ResolveField, Parent } from "@nestjs/graphql";

import { FindByID, ShowAll } from "@/server/utils/common.dto";

import { Person } from "./person.model";
import { PersonService } from "./person.service";

@Resolver(() => Person)
export class PersonResolver {
  public constructor(private readonly personService: PersonService) {}

  @Query(() => [Person])
  public async showPeople(@Args() { skip, first }: ShowAll) {
    return this.personService.showAll(skip, first);
  }

  @Query(() => Person)
  public async findPersonByID(@Args() { id }: FindByID) {
    return this.personService.findByID(id);
  }

  @ResolveField()
  public async user(@Parent() person: Person) {
    if (!person.user) {
      return person.$get("user");
    }
    return person.user;
  }
}
