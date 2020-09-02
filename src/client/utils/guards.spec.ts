import { shouldRenderByAuth } from "./guards";

describe("guards", () => {
  describe("shouldRenderByAuth", () => {
    it("should return true if option aren't specified", () => {
      expect(shouldRenderByAuth(undefined)).toBe(true);
    });

    it("should return true if auth are needed and user are authenticated", () => {
      expect(shouldRenderByAuth(true, true)).toBe(true);
    });

    it("should return false if auth are needed and user aren't authenticated", () => {
      expect(shouldRenderByAuth(true, false)).toBe(false);
    });

    it("should return false if auth aren't needed and user are authenticated", () => {
      expect(shouldRenderByAuth(false, true)).toBe(false);
    });
  });
});
