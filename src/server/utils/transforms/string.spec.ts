import { capitalize, trim, mail } from "./string";

describe("transforms/string", () => {
  describe("capitalize", () => {
    it("should upper first letter", () => {
      const str = "test";

      expect(capitalize(str)).toBe("Test");
    });
  });

  describe("trim", () => {
    it("should trim leading/trailing spaces", () => {
      const str = "             test                  ";

      expect(trim(str)).toBe("test");
    });
  });

  describe("mail", () => {
    it("should trim leading/trailing spaces and lowercase", () => {
      const str = "             tEsT@GMail.CoM                  ";

      expect(mail(str)).toBe("test@gmail.com");
    });
  });
});
