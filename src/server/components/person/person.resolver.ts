import { Resolver, Query, Args } from "@nestjs/graphql";

import { Person } from "@/server/models";
import { FindByID, ShowAll } from "@/server/utils/common.dto";

import { PersonService } from "./person.service";

@Resolver(() => Person)
export class PersonResolver {
  public constructor(private readonly personService: PersonService) {}

  @Query(() => [Person])
  public async showPeople(@Args() { skip, first }: ShowAll) {
    return this.personService.showAll(skip, first);
  }

  @Query(() => Person)
  public async findPerson(@Args() { id }: FindByID) {
    return this.personService.findByID(id);
  }
}
