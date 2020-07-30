import { cleanTruthy } from "./object";

describe("transforms/object", () => {
  describe("cleanTruthy", () => {
    it("should get non object keys", () => {
      const obj = {
        a: {},
        b: { c: 2 },
        d: true,
        e: false,
      };

      const res = cleanTruthy(obj);
      expect(res).toStrictEqual(["a", "d", "e"]);
    });

    it("should return []", () => {
      const res = cleanTruthy();
      expect(res).toStrictEqual([]);
    });

    it("should denylist provided keys", () => {
      const obj = {
        a: {},
        b: "test",
        d: true,
        e: false,
      };

      const res = cleanTruthy(obj, ["a"]);
      expect(res).toStrictEqual(["b", "d", "e"]);
    });
  });
});
