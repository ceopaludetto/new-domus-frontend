import { plainToClass } from "class-transformer";

import { Capitalize, Trim, Mail } from "./string";

describe("transforms/string", () => {
  describe("capitalize", () => {
    it("should upper first letter", () => {
      class Test {
        @Capitalize()
        public upper!: string;
      }

      expect(plainToClass(Test, { upper: "test" })).toEqual({ upper: "Test" });
    });
  });

  describe("trim", () => {
    it("should trim leading/trailing spaces", () => {
      class Test {
        @Trim()
        public trim!: string;
      }

      expect(plainToClass(Test, { trim: "  test            " })).toEqual({ trim: "test" });
    });
  });

  describe("mail", () => {
    it("should trim leading/trailing spaces and lowercase", () => {
      class Test {
        @Mail()
        public mail!: string;
      }

      expect(plainToClass(Test, { mail: " tEsT@gmail.com          " })).toEqual({ mail: "test@gmail.com" });
    });
  });
});
