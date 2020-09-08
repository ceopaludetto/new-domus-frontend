import { IsCPFConstraint } from "./is.cpf";
import { CPF } from "./messages";

describe("IsCPF", () => {
  it("should return true in valid cpf", () => {
    const str = "502.260.068-40";
    const validator = new IsCPFConstraint();

    expect(validator.validate(str)).toBe(true);
  });

  it("should return false in sequence cpf", () => {
    const str = "111.111.111-11";
    const validator = new IsCPFConstraint();

    expect(validator.validate(str)).toBe(false);
  });

  it("should return false in invalid cpf", () => {
    const str = "123.123.123-12";
    const validator = new IsCPFConstraint();

    expect(validator.validate(str)).toBe(false);
  });

  it("should return default message", () => {
    const validator = new IsCPFConstraint();

    expect(validator.defaultMessage()).toBe(CPF);
  });
});
