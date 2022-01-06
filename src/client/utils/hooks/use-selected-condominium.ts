import { useCallback, useEffect, useMemo } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";

import { useProfileQuery } from "@/client/graphql";

import { useCondominiumContext } from "./use-condominium-context";

interface Params extends Record<string, string | undefined> {
  condominium?: string;
}

export function useSelectedCondominium() {
  const [{ data }] = useProfileQuery();
  const { condominiumID: selected, changeCondominiumID } = useCondominiumContext();

  const params = useParams<Params>();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const condominiumID = params?.condominium;
      const hasCondominium = data.profile.person.condominiums.some((c) => c.id === condominiumID);

      if (condominiumID && hasCondominium) changeCondominiumID(condominiumID);
    }
  }, [params, data, changeCondominiumID]);

  const changeCondominium = useCallback(
    (condominiumID?: string, check?: boolean) => {
      if (condominiumID) {
        const hasCondominium = data?.profile.person.condominiums.some((c) => c.id === condominiumID);
        let next = selected;

        if (!check) next = changeCondominiumID(condominiumID);
        if (check && hasCondominium) next = changeCondominiumID(condominiumID);

        if (next) navigate(generatePath("/application/:condominium", { condominium: next }));
      }
    },
    [data, navigate, changeCondominiumID, selected]
  );

  const condominium = useMemo(() => data?.profile.person.condominiums.find((c) => c.id === selected), [data, selected]);
  const hasMultiple = useMemo(() => (data?.profile.person.condominiums.length ?? 0) > 1, [data]);

  return [condominium, { hasMultiple, changeCondominium }] as const;
}
