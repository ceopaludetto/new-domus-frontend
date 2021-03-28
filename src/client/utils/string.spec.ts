import { removeMask, splitPhone, retrieveTo, hasPathname, mergePhone } from "./string";

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

  describe("hasPathname", () => {
    it("should return true if has pathname", () => {
      const str = { pathname: "" };

      expect(hasPathname(str)).toBe(true);
    });

    it("should return false if is string", () => {
      const str = "test";

      expect(hasPathname(str)).toBe(false);
    });
  });

  describe("mergePhone", () => {
    it('should return "" if no phone are provided', () => {
      expect(mergePhone()).toBe("");
    });

    it("should return phone concatenated", () => {
      expect(mergePhone({ ddd: "(99)", number: "99999-9999" })).toBe("(99) 99999-9999");
    });
  });
});
