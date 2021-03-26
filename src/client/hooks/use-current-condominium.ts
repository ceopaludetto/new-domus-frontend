import { useMemo } from "react";

import { useSelectedCondominiumQuery, useMeQuery } from "@/client/graphql/index.graphql";

export function useCurrentCondominium() {
  const { data: condominium } = useSelectedCondominiumQuery();
  const { data: me } = useMeQuery();

  return useMemo(() => me?.profile.person.condominiums.find((c) => c.id === condominium?.selectedCondominium), [
    me?.profile,
    condominium,
  ]);
}
