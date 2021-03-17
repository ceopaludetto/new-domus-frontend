import * as React from "react";

import { useSelectedCondominiumQuery, useMeQuery } from "@/client/graphql";

export function useCurrentCondominium() {
  const { data: condominium } = useSelectedCondominiumQuery();
  const { data: me } = useMeQuery();

  return React.useMemo(() => me?.profile.person.condominiums.find((c) => c.id === condominium?.selectedCondominium), [
    me?.profile,
    condominium,
  ]);
}
