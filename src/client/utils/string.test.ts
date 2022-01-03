import { removeMask } from "./string";

describe("removeMask", () => {
  it("should removeMask from given string", () => {
    const str = "123-456-789";

    expect(removeMask(str)).toStrictEqual("123456789");
  });
});
