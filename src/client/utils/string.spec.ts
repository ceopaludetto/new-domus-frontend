import { removeMask, retrieveTo } from "./string";

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

  describe("retrieveTo", () => {
    it("if undefined should return empty string", () => {
      const str = undefined;

      expect(retrieveTo(str)).toBe("");
    });

    it("if string should return the same string", () => {
      const str = "test";

      expect(retrieveTo(str)).toBe(str);
    });

    it("if array should return first index", () => {
      const str = ["test", "test-2"];

      expect(retrieveTo(str)).toBe(str[0]);
    });
  });
});
