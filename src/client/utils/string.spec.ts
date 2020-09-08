import { removeMask, splitPhone } from "./string";

describe("string", () => {
  describe("removeMask", () => {
    it("should remove non number chars", () => {
      const str = "(11)";

      expect(removeMask(str)).toBe("11");
    });

    it("should keep number values", () => {
      const str = "11(12w312ad1";

      expect(removeMask(str)).toBe("11123121");
    });
  });

  describe("splitPhone", () => {
    it("should split phone number in ddd and number itself", () => {
      const str = "(11) 2989-7288";

      expect(splitPhone(str)).toEqual({
        ddd: "11",
        number: "29897288",
      });
    });

    it("should work with smartphone number too", () => {
      const str = "(11) 95215-1529";

      expect(splitPhone(str)).toEqual({
        ddd: "11",
        number: "952151529",
      });
    });
  });
});
