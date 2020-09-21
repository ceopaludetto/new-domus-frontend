import type { CondominiumValuesFragment } from "@/client/graphql";

export function isMultiCondominium(condominiums?: readonly CondominiumValuesFragment[]) {
  if (!condominiums) {
    return false;
  }

  return condominiums.length > 1;
}
