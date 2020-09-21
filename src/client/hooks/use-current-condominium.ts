import * as React from "react";

import { useSelectedCondominiumQuery, useMeQuery } from "@/client/graphql";

export function useCurrentCondominium() {
  const { data: condominium } = useSelectedCondominiumQuery();
  const { data: me } = useMeQuery({ fetchPolicy: "cache-first" });

  const selected = React.useMemo(
    () => me?.profile.person.condominiums.find((c) => c.id === condominium?.selectedCondominium),
    [me?.profile.person.condominiums, condominium?.selectedCondominium]
  );

  return selected;
}
