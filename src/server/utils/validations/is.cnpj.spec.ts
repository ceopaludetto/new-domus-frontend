import { IsCNPJConstraint } from "./is.cnpj";
import { CNPJ } from "./messages";

describe("IsCNPJ", () => {
  it("should return true in valid cnpj", () => {
    const str = "42.276.052/0001-35";
    const validator = new IsCNPJConstraint();

    expect(validator.validate(str)).toBe(true);
  });

  it("should return false in sequence cnpj", () => {
    const str = "11.111.111/1111-11";
    const validator = new IsCNPJConstraint();

    expect(validator.validate(str)).toBe(false);
  });

  it("should return false in invalid cnpj", () => {
    const str = "12.231.231/2312-21";
    const validator = new IsCNPJConstraint();

    expect(validator.validate(str)).toBe(false);
  });

  it("should return default message", () => {
    const validator = new IsCNPJConstraint();

    expect(validator.defaultMessage()).toBe(CNPJ);
  });
});
