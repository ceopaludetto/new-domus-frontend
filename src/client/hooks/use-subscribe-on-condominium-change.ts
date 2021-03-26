import { useShallowCompareEffect } from "react-use";

import type { CondominiumValuesFragment } from "../graphql/index.graphql";
import { useCurrentCondominium } from "./use-current-condominium";

export function useSubscribeOnCondominiumChange(onChange: (current?: CondominiumValuesFragment) => void) {
  const currentCondominium = useCurrentCondominium();

  useShallowCompareEffect(() => {
    if (onChange) onChange(currentCondominium);
  }, [currentCondominium]);
}
