import { FiGrid, FiSliders, FiMessageCircle } from "react-icons/fi";

import type { ApplicationSidebarRouteConfig } from "../utils/types";

export const sidebarRoutes: ApplicationSidebarRouteConfig[] = [
  {
    route: "@Application:Dashboard",
    displayName: "Dashboard",
    icon: FiGrid,
  },
  {
    route: "@Application:Messages",
    displayName: "Mensagens",
    icon: FiMessageCircle,
  },
  {
    route: "@Application:Settings",
    displayName: "Ajustes",
    icon: FiSliders,
  },
];
