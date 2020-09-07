import * as React from "react";
import { generatePath } from "react-router-dom";

import { useCurrentCondominium } from "./use-current-condominium";

export function usePathWithCondominium() {
  const condominium = useCurrentCondominium();

  const genPath = React.useCallback(
    (path: string, params?: Record<string, any>) => {
      return condominium ? generatePath(path, { condominium: condominium?.id, ...params }) : path;
    },
    [condominium]
  );

  return genPath;
}
