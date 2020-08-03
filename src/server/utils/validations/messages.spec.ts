import { ValidationArguments } from "class-validator";

import * as Messages from "./messages";

describe("validations/messages", () => {
  describe("MAX_LENGTH", () => {
    it("should uppercase CPF and CNPJ", () => {
      const cpf: ValidationArguments = {
        property: "cpf",
        constraints: [11],
        value: "50226006840",
        object: {},
        targetName: "test",
      };

      const cnpj: ValidationArguments = {
        property: "cnpj",
        constraints: [14],
        value: "50226006840",
        object: {},
        targetName: "test",
      };

      expect(Messages.MAX_LENGTH(cpf)).toBe("CPF deve conter no máximo 11 caracteres");
      expect(Messages.MAX_LENGTH(cnpj)).toBe("CNPJ deve conter no máximo 14 caracteres");
    });

    it("should capitalize non CPF and CNPJ", () => {
      const any: ValidationArguments = {
        property: "name",
        constraints: [11],
        value: "50226006840",
        object: {},
        targetName: "test",
      };

      expect(Messages.MAX_LENGTH(any)).toBe("Name deve conter no máximo 11 caracteres");
    });
  });
});
