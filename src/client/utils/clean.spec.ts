import { clean } from "./clean";

describe("clean", () => {
  it("should remove falsy pairs", () => {
    const obj = {
      a: "",
      b: "teste",
      c: "teste",
      d: {},
    };

    expect(clean(obj)).toEqual({
      b: "teste",
      c: "teste",
      d: {},
    });
  });
});
