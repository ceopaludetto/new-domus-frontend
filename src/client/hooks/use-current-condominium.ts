import * as React from "react";

import { useQuery } from "@apollo/client";

import { SelectedCondominium, SelectedCondominiumQuery, Me, MeQuery, Logged, LoggedQuery } from "@/client/graphql";

export function useCurrentCondominium() {
  const { data: condominium } = useQuery<SelectedCondominiumQuery>(SelectedCondominium);
  const { data: me, refetch } = useQuery<MeQuery>(Me);
  const { data: logged } = useQuery<LoggedQuery>(Logged);

  React.useEffect(() => {
    if (logged?.logged) {
      refetch();
    }
  }, [logged, refetch]);

  const selected = React.useMemo(
    () => me?.profile.person.condominiums.find((c) => c.id === condominium?.selectedCondominium),
    [me?.profile.person.condominiums, condominium?.selectedCondominium]
  );

  return selected;
}
