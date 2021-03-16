import { cep, cnpj, cpf, tel, date } from "./masks";

describe("mask", () => {
  describe("cep", () => {
    it("should put cep mask in value", () => {
      const str = "02137030";

      expect(cep.format(str)).toBe("02137-030");
    });
  });

  describe("cnpj", () => {
    it("should put cnpj mask in value", () => {
      const str = "02328975000179";

      expect(cnpj.format(str)).toBe("02.328.975/0001-79");
    });
  });

  describe("cpf", () => {
    it("should put cpf mask in value", () => {
      const str = "50226006840";

      expect(cpf.format(str)).toBe("502.260.068-40");
    });
  });

  describe("tel", () => {
    it("should put tel mask in value", () => {
      const str = "1129897288";

      expect(tel.format(str)).toBe("(11) 2989-7288");
    });

    it("should put smartphone mask in value", () => {
      const str = "11952151529";

      expect(tel.format(str)).toBe("(11) 95215-1529");
    });
  });

  describe("date", () => {
    it("should put date mask in value", () => {
      const str = "18092001";

      expect(date.format(str)).toBe("18/09/2001");
    });
  });
});
