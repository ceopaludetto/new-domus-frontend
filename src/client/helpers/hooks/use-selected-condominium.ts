import { useCallback, useEffect, useMemo } from "react";

import { useMeQuery } from "@/client/graphql";
import { condominiumStorage } from "@/client/providers/storages";

import { useQueryParam } from "./use-query-param";

export function useSelectedCondominium() {
  const { data } = useMeQuery();
  const [condominium, setCondominium] = useQueryParam("c");

  const populated = useMemo(() => {
    if (condominium) {
      return data?.profile?.person?.condominiums.find((c) => c.id === condominium);
    }

    return undefined;
  }, [condominium, data?.profile?.person?.condominiums]);

  useEffect(() => {
    if (data?.profile?.person?.condominiums?.length && !condominium) {
      const id = data?.profile?.person?.condominiums[0].id;

      setCondominium(id);
      condominiumStorage(id);
    }

    if (condominium && !condominiumStorage()) {
      condominiumStorage(condominium);
    }
  }, [condominium, setCondominium, data?.profile?.person?.condominiums]);

  const changeCondominium = useCallback(
    (id: string) => {
      if (data?.profile?.person?.condominiums?.some((item) => item.id === id)) {
        setCondominium(id);
        condominiumStorage(id);
      }
    },
    [data?.profile?.person?.condominiums, setCondominium]
  );

  const reset = useCallback(() => {
    setCondominium("");
    condominiumStorage("");
  }, [setCondominium]);

  const hasMultiple = useMemo(
    () => (data?.profile?.person?.condominiums?.length ?? 0) > 1,
    [data?.profile?.person?.condominiums]
  );

  return [populated, changeCondominium, { reset, hasMultiple }] as const;
}
