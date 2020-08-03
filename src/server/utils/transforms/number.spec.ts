import { removeMask } from "./number";

describe("transforms/number", () => {
  describe("removeMask", () => {
    it("should remove mask", () => {
      const str = "(11) 95215-1529";

      expect(removeMask(str)).toBe("11952151529");
    });
  });
});
