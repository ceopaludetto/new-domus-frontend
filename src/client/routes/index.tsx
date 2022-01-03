import loadable from "@loadable/component";
import Conditional from "conditional-wrap";

import type { ApplicationRouteConfig, RouteConfig } from "../utils/types";
import { DontRequireAuth, RequireAuth } from "./guards";

function createRoute({ component: Component, needAuth, ...rest }: RouteConfig): ApplicationRouteConfig {
  return {
    ...rest,
    component: Component,
    element: (
      <Conditional
        condition={typeof needAuth !== "undefined"}
        wrap={(el) => {
          if (needAuth) return <RequireAuth>{el}</RequireAuth>;
          return <DontRequireAuth>{el}</DontRequireAuth>;
        }}
      >
        <Component />
      </Conditional>
    ),
  };
}

export const routes: ApplicationRouteConfig[] = [
  createRoute({
    name: "@Main",
    path: "/",
    component: loadable(() => import("@/client/pages/main")),
  }),
  createRoute({
    name: "@Authentication",
    path: "/authentication",
    needAuth: false,
    component: loadable(() => import("@/client/pages/authentication")),
    children: [
      createRoute({
        name: "@Authentication:Signin",
        path: "signin",
        component: loadable(() => import("@/client/pages/authentication/pages/login")),
      }),
      createRoute({
        name: "@Authentication:Forgot",
        path: "forgot",
        component: loadable(() => import("@/client/pages/authentication/pages/forgot")),
      }),
    ],
  }),
  createRoute({
    name: "@Application",
    path: "/application/:condominium",
    needAuth: true,
    component: loadable(() => import("@/client/pages/application")),
    children: [
      createRoute({
        name: "@Application:Dashboard",
        index: true,
        component: loadable(() => import("@/client/pages/application/pages/dashboard")),
      }),
      createRoute({
        name: "@Application:Messages",
        path: "messages",
        component: loadable(() => import("@/client/pages/application/pages/messages")),
      }),
      createRoute({
        name: "@Application:Settings",
        path: "settings",
        component: loadable(() => import("@/client/pages/application/pages/settings")),
        children: [
          createRoute({
            name: "@Application:Settings:Personal",
            index: true,
            component: loadable(() => import("@/client/pages/application/pages/settings/pages/personal")),
          }),
          createRoute({
            name: "@Application:Settings:Security",
            path: "security",
            component: loadable(() => import("@/client/pages/application/pages/settings/pages/security")),
          }),
          createRoute({
            name: "@Application:Settings:Condominium",
            path: "condominium",
            component: loadable(() => import("@/client/pages/application/pages/settings/pages/condominium")),
          }),
        ],
      }),
    ],
  }),
];
