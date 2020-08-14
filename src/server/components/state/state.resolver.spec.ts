import { getModelToken } from "@nestjs/sequelize";
import { Test } from "@nestjs/testing";

import { State } from "@/server/models";

import { StateResolver } from "./state.resolver";
import { StateService } from "./state.service";

jest.mock("@/server/models");

describe("StateResolver", () => {
  let stateResolver: StateResolver;
  let stateService: StateService;

  beforeEach(async () => {
    const ref = await Test.createTestingModule({
      providers: [
        StateResolver,
        StateService,
        {
          provide: getModelToken(State),
          useClass: State,
        },
      ],
    }).compile();

    stateResolver = ref.get<StateResolver>(StateResolver);
    stateService = ref.get<StateService>(StateService);
  });

  it("showStates", async () => {
    const result = [new State()];
    jest.spyOn(stateService, "showAll").mockImplementation(() => Promise.resolve(result));

    expect(await stateResolver.showStates({})).toBe(result);
  });

  it("findByStateID", async () => {
    const result = new State();
    jest.spyOn(stateService, "findByID").mockImplementation(() => Promise.resolve(result));

    expect(await stateResolver.findStateByID({ id: "" })).toBe(result);
  });
});
