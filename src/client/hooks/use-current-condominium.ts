import * as React from "react";

import { useQuery } from "@apollo/client";

import { SelectedCondominium, SelectedCondominiumQuery, Me, MeQuery } from "@/client/graphql";

export function useCurrentCondominium() {
  const { data: condominium } = useQuery<SelectedCondominiumQuery>(SelectedCondominium);
  const { data: me } = useQuery<MeQuery>(Me);

  return React.useMemo(() => me?.profile.person.condominiums.find((c) => c.id === condominium?.selectedCondominium), [
    me?.profile.person.condominiums,
    condominium?.selectedCondominium,
  ]);
}
