import * as React from "react";
import { useLocation } from "react-router-dom";

import { routes } from "@/client/providers/routes";
import { findRoute } from "@/client/utils/preload";

export function useBreadcrumbs() {
  const location = useLocation();

  return React.useMemo(() => findRoute(location.pathname, routes, []).filter((r) => r.name !== "@APP"), [location]);
}
