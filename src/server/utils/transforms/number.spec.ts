import { plainToClass } from "class-transformer";

import { RemoveMask } from "./number";

describe("transforms/number", () => {
  describe("removeMask", () => {
    it("should remove mask", () => {
      class Test {
        @RemoveMask()
        public removeMask!: string;
      }

      const str = "(11) 95215-1529";

      expect(plainToClass(Test, { removeMask: str })).toEqual({ removeMask: "11952151529" });
    });
  });
});
