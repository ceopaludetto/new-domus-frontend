import { getRepositoryToken } from "@mikro-orm/nestjs";
import { Test } from "@nestjs/testing";

import { Local } from "@/server/models";

import { LocalResolver } from "./local.resolver";
import { LocalService } from "./local.service";

jest.mock("@/server/models");

describe("LocalResolver", () => {
  let localResolver: LocalResolver;
  let localService: LocalService;

  beforeEach(async () => {
    const ref = await Test.createTestingModule({
      providers: [
        LocalResolver,
        LocalService,
        {
          provide: getRepositoryToken(Local),
          useClass: Local,
        },
      ],
    }).compile();

    localResolver = ref.get<LocalResolver>(LocalResolver);
    localService = ref.get<LocalService>(LocalService);
  });

  it("showLocals", async () => {
    const result = [new Local()];
    jest.spyOn(localService, "showAll").mockImplementation(() => Promise.resolve(result));

    expect(await localResolver.showLocals({})).toBe(result);
  });

  it("findByLocalID", async () => {
    const result = new Local();
    jest.spyOn(localService, "findByID").mockImplementation(() => Promise.resolve(result));

    expect(await localResolver.findLocalByID({ id: "" })).toBe(result);
  });
});
