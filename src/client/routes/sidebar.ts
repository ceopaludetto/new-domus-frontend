import { FiGrid, FiSliders, FiMessageCircle } from "react-icons/fi";

import type { ApplicationSidebarRouteConfig } from "../utils/types";

export const sidebarRoutes: ApplicationSidebarRouteConfig[] = [
  {
    route: "@Application:Dashboard",
    displayName: "Dashboard",
    path: "",
    icon: FiGrid,
  },
  {
    route: "@Application:Messages",
    displayName: "Mensagens",
    path: "messages",
    icon: FiMessageCircle,
  },
  {
    route: "@Application:Settings",
    displayName: "Ajustes",
    path: "settings",
    icon: FiSliders,
    end: false,
  },
];
