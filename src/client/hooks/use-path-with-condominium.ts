import { useCallback } from "react";

import type { CondominiumValuesFragment } from "@/client/graphql/index.graphql";
import { CondominiumURL } from "@/client/utils/url";

import { useCurrentCondominium } from "./use-current-condominium";

type UsePathWithCondominiumReturns = [
  (path: string, params?: Record<string, any>) => string,
  CondominiumValuesFragment | undefined
];

export function usePathWithCondominium(): UsePathWithCondominiumReturns {
  const condominium = useCurrentCondominium();

  const generate = useCallback(
    (path: string) => {
      const [url, currentSearch] = path.split("?");

      const condominiumURL = new CondominiumURL({ pathname: url, search: currentSearch });

      if (condominium) {
        condominiumURL.setCondominium(condominium.id);
      }

      return condominiumURL.getNormalizedURI();
    },
    [condominium]
  );

  return [generate, condominium];
}
