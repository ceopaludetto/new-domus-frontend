import { shouldAllowAccess } from "./guards";

describe("guards", () => {
  describe("shouldAllowAccess", () => {
    it("should return true if option aren't specified", () => {
      expect(shouldAllowAccess(false)).toBe(true);
      expect(shouldAllowAccess(true)).toBe(true);
    });

    it("should return true if auth are needed and user are authenticated", () => {
      expect(shouldAllowAccess(true, true)).toBe(true);
    });

    it("should return false if auth are needed and user aren't authenticated", () => {
      expect(shouldAllowAccess(false, true)).toBe(false);
    });

    it("should return false if auth aren't needed and user are authenticated", () => {
      expect(shouldAllowAccess(true, false)).toBe(false);
    });
  });
});
