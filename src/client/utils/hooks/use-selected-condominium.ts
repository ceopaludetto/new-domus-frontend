import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import { useReactiveVar } from "@apollo/client";

import { useProfileQuery } from "@/client/graphql";
import { condominiumStorage } from "@/client/providers/storage";

interface Params extends Record<string, string | undefined> {
  condominium?: string;
}

export function useSelectedCondominium() {
  const { data } = useProfileQuery();
  const params = useParams<Params>();
  const selected = useReactiveVar(condominiumStorage);

  useEffect(() => {
    if (data) {
      const condominiumID = params?.condominium;
      const hasCondominium = data.profile.person.condominiums.some((c) => c.id === condominiumID);

      if (condominiumID && hasCondominium) condominiumStorage(condominiumID);
    }
  }, [params, data]);

  const changeCondominium = useCallback(
    (condominiumID?: string, check?: boolean) => {
      if (condominiumID) {
        const hasCondominium = data?.profile.person.condominiums.some((c) => c.id === condominiumID);

        if (!check) condominiumStorage(condominiumID);
        if (check && hasCondominium) condominiumStorage(condominiumID);
      }
    },
    [data]
  );

  const condominium = useMemo(() => data?.profile.person.condominiums.find((c) => c.id === selected), [data, selected]);
  const hasMultiple = useMemo(() => (data?.profile.person.condominiums.length ?? 0) > 1, [data]);

  return [condominium, { hasMultiple, changeCondominium }] as const;
}
