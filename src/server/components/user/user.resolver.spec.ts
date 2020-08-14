import { getRepositoryToken } from "@mikro-orm/nestjs";
import { Test } from "@nestjs/testing";

import { User } from "@/server/models";

import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

jest.mock("@/server/models");

describe("UserResolver", () => {
  let userResolver: UserResolver;
  let userService: UserService;

  beforeEach(async () => {
    const ref = await Test.createTestingModule({
      providers: [
        UserResolver,
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: User,
        },
      ],
    }).compile();

    userResolver = ref.get<UserResolver>(UserResolver);
    userService = ref.get<UserService>(UserService);
  });

  it("showUsers", async () => {
    const result = [new User()];
    jest.spyOn(userService, "showAll").mockImplementation(() => Promise.resolve(result));

    expect(await userResolver.showUsers({})).toBe(result);
  });

  it("findUserByID", async () => {
    const result = new User();
    jest.spyOn(userService, "findByID").mockImplementation(() => Promise.resolve(result));

    expect(await userResolver.findUserByID({ id: "" })).toBe(result);
  });

  it("findUserByID", async () => {
    const result = new User();
    jest.spyOn(userService, "findByLogin").mockImplementation(() => Promise.resolve(result));

    expect(await userResolver.findUserByLogin({ login: "" })).toBe(result);
  });
});
