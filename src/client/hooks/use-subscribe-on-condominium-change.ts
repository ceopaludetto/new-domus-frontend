import { useEffect } from "react";

import type { CondominiumValuesFragment } from "../graphql/index.graphql";
import { useCurrentCondominium } from "./use-current-condominium";

export function useSubscribeOnCondominiumChange(onChange: (current?: CondominiumValuesFragment) => void) {
  const currentCondominium = useCurrentCondominium();

  useEffect(() => {
    if (onChange) onChange(currentCondominium);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCondominium]);
}
