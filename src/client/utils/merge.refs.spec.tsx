import { merge } from "./merge.refs";

describe("mergeRefs", () => {
  it("should merge two value refs", () => {
    const primitiveValue = { current: "value" };
    const funcValue = { current: "" };

    const func = (v: string) => {
      funcValue.current = v;
    };

    // create merge func
    const mergeFunc = merge([primitiveValue, func]);

    // populate both refs with test
    mergeFunc("test");

    expect(primitiveValue).toEqual({ current: "test" });
    expect(funcValue).toEqual({ current: "test" });
  });
});
