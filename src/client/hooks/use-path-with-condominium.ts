import * as React from "react";
import { generatePath } from "react-router-dom";

import type { CondominiumValuesFragment } from "@/client/graphql";

import { useCurrentCondominium } from "./use-current-condominium";

type UsePathWithCondominiumReturns = [
  (path: string, params?: Record<string, any>) => string,
  CondominiumValuesFragment | undefined
];

export function usePathWithCondominium(): UsePathWithCondominiumReturns {
  const condominium = useCurrentCondominium();

  const gen = React.useCallback(
    (path: string, params?: Record<string, any>) => {
      return condominium ? generatePath(path, { condominium: condominium?.id, ...params }) : path;
    },
    [condominium]
  );

  return [gen, condominium];
}
