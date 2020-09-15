import type { CondominiumValuesFragment } from "@/client/graphql";

import { isMultiCondominium } from "./condominium";

describe("condominium", () => {
  it("should return false if no condominium is provided", () => {
    const v = undefined;

    expect(isMultiCondominium(v)).toBe(false);
  });

  it("should return false if has one condominium", () => {
    const v: CondominiumValuesFragment[] = [
      { companyName: "", character: "", cnpj: "", id: "", __typename: "Condominium" },
    ];

    expect(isMultiCondominium(v)).toBe(false);
  });

  it("should return true if has two or mode condominiums", () => {
    const v: CondominiumValuesFragment[] = [
      { companyName: "", character: "", cnpj: "", id: "", __typename: "Condominium" },
      { companyName: "", character: "", cnpj: "", id: "", __typename: "Condominium" },
    ];

    expect(isMultiCondominium(v)).toBe(true);
  });
});
