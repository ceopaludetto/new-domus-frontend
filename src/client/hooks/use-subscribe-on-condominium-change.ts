import { useEffect, useRef } from "react";
import { useIsomorphicLayoutEffect } from "react-use";

import type { CondominiumValuesFragment } from "../graphql/index.graphql";
import { useCurrentCondominium } from "./use-current-condominium";

export function useSubscribeOnCondominiumChange(onChange: (current?: CondominiumValuesFragment) => void) {
  const callback = useRef<(current?: CondominiumValuesFragment) => void>();
  const currentCondominium = useCurrentCondominium();

  useIsomorphicLayoutEffect(() => {
    callback.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (callback.current) callback.current(currentCondominium);
  }, [currentCondominium]);
}
