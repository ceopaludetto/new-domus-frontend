import { getRepositoryToken } from "@mikro-orm/nestjs";
import { Test } from "@nestjs/testing";

import { City } from "@/server/models";

import { CityResolver } from "./city.resolver";
import { CityService } from "./city.service";

describe("CityResolver", () => {
  let cityResolver: CityResolver;
  let cityService: CityService;

  beforeEach(async () => {
    const ref = await Test.createTestingModule({
      providers: [
        CityResolver,
        CityService,
        {
          provide: getRepositoryToken(City),
          useClass: City,
        },
      ],
    }).compile();

    cityResolver = ref.get<CityResolver>(CityResolver);
    cityService = ref.get<CityService>(CityService);
  });

  it("showCities", async () => {
    const result = [new City()];
    jest.spyOn(cityService, "showAll").mockImplementation(() => Promise.resolve(result));

    expect(await cityResolver.showCities({})).toBe(result);
  });

  it("findCityByID", async () => {
    const result = new City();
    jest.spyOn(cityService, "findByID").mockImplementation(() => Promise.resolve(result));

    expect(await cityResolver.findCityByID({ id: "" })).toBe(result);
  });

  it("findByState", async () => {
    const result = [new City()];
    jest.spyOn(cityService, "findByState").mockImplementation(() => Promise.resolve(result));

    expect(await cityResolver.findCitiesByStateID({ id: "" })).toBe(result);
  });
});
