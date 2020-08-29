import { getModule, hasFetchBefore } from "./lazy";

describe("lazy", () => {
  describe("getModule", () => {
    it("should return if default exported", () => {
      const lib = { default: () => "teste" };

      expect(getModule(lib)()).toBe("teste");
    });

    it("should return if no default exported", () => {
      const lib = () => "teste";

      expect(getModule(lib)()).toBe("teste");
    });
  });

  describe("hasFetchBefore", () => {
    it("should return true", () => {
      const c = { fetchBefore: () => {} };

      expect(hasFetchBefore(c)).toBe(true);
    });

    it("should return false in primitive value", () => {
      const c = "any value";

      expect(hasFetchBefore(c)).toBe(false);
    });

    it("should return false in object", () => {
      const c = {};

      expect(hasFetchBefore(c)).toBe(false);
    });
  });
});
