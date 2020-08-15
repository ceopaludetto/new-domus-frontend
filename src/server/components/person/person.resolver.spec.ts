import { getRepositoryToken } from "@mikro-orm/nestjs";
import { Test } from "@nestjs/testing";

import { Person } from "@/server/models";

import { PersonResolver } from "./person.resolver";
import { PersonService } from "./person.service";

describe("PersonResolver", () => {
  let personResolver: PersonResolver;
  let personService: PersonService;

  beforeEach(async () => {
    const ref = await Test.createTestingModule({
      providers: [
        PersonResolver,
        PersonService,
        {
          provide: getRepositoryToken(Person),
          useClass: Person,
        },
      ],
    }).compile();

    personResolver = ref.get<PersonResolver>(PersonResolver);
    personService = ref.get<PersonService>(PersonService);
  });

  it("showPeople", async () => {
    const result = [new Person()];
    jest.spyOn(personService, "showAll").mockImplementation(() => Promise.resolve(result));

    expect(await personResolver.showPeople({})).toBe(result);
  });

  it("findByPersonID", async () => {
    const result = new Person();
    jest.spyOn(personService, "findByID").mockImplementation(() => Promise.resolve(result));

    expect(await personResolver.findPersonByID({ id: "" })).toBe(result);
  });
});
