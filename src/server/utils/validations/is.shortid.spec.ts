import { generate } from "shortid";

import { IsShortidConstraint } from "./is.shortid";
import { SHORTID } from "./messages";

describe("IsShortid", () => {
  it("should return true if no value provided", () => {
    const str = "";
    const validator = new IsShortidConstraint();

    expect(validator.validate(str)).resolves.toBe(true);
  });

  it("should return false if falsy value is provided", () => {
    const str = "qualquer coisa";
    const validator = new IsShortidConstraint();

    expect(validator.validate(str)).resolves.toBe(false);
  });

  it("should return true if generated value is provided", () => {
    const str = generate();
    const validator = new IsShortidConstraint();

    expect(validator.validate(str)).resolves.toBe(true);
  });

  it("should return default message", () => {
    const validator = new IsShortidConstraint();

    expect(validator.defaultMessage()).toBe(SHORTID);
  });
});
