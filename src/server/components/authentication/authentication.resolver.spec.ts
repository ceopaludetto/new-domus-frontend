import { getRepositoryToken } from "@mikro-orm/nestjs";
import { getQueueToken } from "@nestjs/bull";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Test } from "@nestjs/testing";
import { getLoggerToken } from "nestjs-pino";

import { UserService } from "@/server/components/user";
import { User } from "@/server/models";

import { AuthenticationResolver } from "./authentication.resolver";
import { AuthenticationService } from "./authentication.service";

describe("AuthenticationResolver", () => {
  let authenticationResolver: AuthenticationResolver;
  let authenticationService: AuthenticationService;
  let userService: UserService;

  beforeEach(async () => {
    const ref = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: "jwt" }), JwtModule.register({ secret: "teste" })],
      providers: [
        AuthenticationResolver,
        AuthenticationService,
        UserService,
        // mocks
        {
          provide: getQueueToken("mail"),
          useValue: () => {},
        },
        {
          provide: getLoggerToken(AuthenticationService.name),
          useValue: () => {},
        },
        {
          provide: getRepositoryToken(User),
          useClass: User,
        },
      ],
    }).compile();

    authenticationResolver = ref.get<AuthenticationResolver>(AuthenticationResolver);
    authenticationService = ref.get<AuthenticationService>(AuthenticationService);
    userService = ref.get<UserService>(UserService);
  });

  it("login", async () => {
    const result = new User();
    jest.spyOn(authenticationService, "login").mockImplementation(() => Promise.resolve(result));

    expect(await authenticationResolver.login({} as any, { res: {} } as any)).toBe(result);
  });

  it("register", async () => {
    const result = new User();
    jest.spyOn(authenticationService, "register").mockImplementation(() => Promise.resolve(result));

    expect(await authenticationResolver.register({} as any, { res: {} } as any)).toBe(result);
  });

  it("forgot", async () => {
    const result = "any@mail.com";
    jest.spyOn(authenticationService, "forgot").mockImplementation(() => Promise.resolve(result));

    expect(await authenticationResolver.forgot({} as any)).toBe(result);
  });

  it("profile", async () => {
    const result = new User();
    jest.spyOn(userService, "populate").mockImplementation(() => Promise.resolve(result));

    expect(await authenticationResolver.profile({ req: { user: result } } as any)).toBe(result);
  });
});
