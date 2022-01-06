import { cnpj, cpf, phone } from "./mask";

describe("Phone Mask", () => {
  it("should format to house phone", () => {
    const value = "1112345678";

    expect(phone.format(value)).toBe("(11) 1234-5678");
    expect(phone.format()).toBe("");
  });

  it("should format to mobile phone", () => {
    const value = "11912345678";

    expect(phone.format(value)).toBe("(11) 91234-5678");
  });

  it("should replace with _", () => {
    const value = "1";

    expect(phone.replace(value)).toBe("(__) ____-____");
    expect(phone.replace(value + value)).toBe("(1_) ____-____");
    expect(phone.replace("")).toBe("");
    expect(phone.replace()).toBe("");
  });
});

describe("CPF Mask", () => {
  it("should format to cpf", () => {
    const value = "12345678910";

    expect(cpf.format(value)).toBe("123.456.789-10");
    expect(cpf.format()).toBe("");
  });

  it("should replace with _", () => {
    const value = "1";

    expect(cpf.replace(value)).toBe("1__.___.___-__");
    expect(cpf.replace()).toBe("");
  });
});

describe("CNPJ Mask", () => {
  it("should format to cnpj", () => {
    const value = "12345678000110";

    expect(cnpj.format(value)).toBe("12.345.678/0001-10");
    expect(cnpj.format()).toBe("");
  });

  it("should replace with _", () => {
    const value = "1";

    expect(cnpj.replace(value)).toBe("1_.___.___/____-__");
    expect(cnpj.replace()).toBe("");
  });
});
