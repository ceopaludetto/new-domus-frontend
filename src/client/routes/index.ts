import loadable from "@loadable/component";

import type { ApplicationRouteConfig } from "../utils/types";

export const routes: ApplicationRouteConfig[] = [
  {
    name: "@Main",
    path: ["/"],
    exact: true,
    component: loadable(() => import("@/client/pages/main")),
  },
  {
    name: "@Authentication",
    path: ["/authentication/signin", "/authentication/forgot"],
    exact: true,
    component: loadable(() => import("@/client/pages/authentication")),
    routes: [
      {
        name: "@Authentication:Signin",
        path: "/authentication/signin",
        exact: true,
        component: loadable(() => import("@/client/pages/authentication/pages/login")),
      },
      {
        name: "@Authentication:Forgot",
        path: "/authentication/forgot",
        exact: true,
        component: loadable(() => import("@/client/pages/authentication/pages/forgot")),
      },
    ],
  },
  {
    name: "@Application",
    path: ["/application", "/application/messages", "/application/settings", "/application/settings/condominium"],
    exact: true,
    component: loadable(() => import("@/client/pages/application")),
    routes: [
      {
        name: "@Application:Dashboard",
        path: "/application",
        exact: true,
        component: loadable(() => import("@/client/pages/application/pages/dashboard")),
      },
      {
        name: "@Application:Messages",
        path: "/application/messages",
        exact: true,
        component: loadable(() => import("@/client/pages/application/pages/messages")),
      },
      {
        name: "@Application:Settings",
        path: ["/application/settings", "/application/settings/condominium"],
        exact: true,
        component: loadable(() => import("@/client/pages/application/pages/settings")),
        routes: [
          {
            name: "@Application:Settings:Personal",
            path: "/application/settings",
            exact: true,
            component: loadable(() => import("@/client/pages/application/pages/settings/pages/personal")),
          },
          {
            name: "@Application:Settings:Condominium",
            path: "/application/settings/condominium",
            exact: true,
            component: loadable(() => import("@/client/pages/application/pages/settings/pages/condominium")),
          },
        ],
      },
    ],
  },
];
