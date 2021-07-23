import { useCallback } from "react";

import qs from "qs";

import { hasPathname } from "@/client/utils/string";

import { useSelectedCondominium } from "./use-selected-condominium";

export function usePathWithCondominium() {
  const [condominium] = useSelectedCondominium();

  const generate = useCallback(
    (path: { pathname: string } | string) => {
      const to = hasPathname(path) ? path.pathname : path;
      const [root, ...rest] = to.split("?");
      const parsed = qs.parse(rest.join("?"));

      if (condominium?.id) {
        parsed.c = condominium.id;
      }

      return `${root}?${qs.stringify(parsed)}`;
    },
    [condominium]
  );

  return generate;
}
