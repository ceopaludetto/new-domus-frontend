import { phone } from "./mask";

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
