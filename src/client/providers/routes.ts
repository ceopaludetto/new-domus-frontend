import loadable from "@loadable/component";

import { Route } from "@/client/utils/common.dto";

export const routes: Route[] = [
  {
    name: "@MAIN",
    path: "/",
    exact: true,
    component: loadable(() => import("@/client/pages/main")),
  },
  {
    name: "@AUTH",
    path: ["/auth/signin", "/auth/signup", "/auth/forgot"],
    exact: true,
    component: loadable(() => import("@/client/pages/auth")),
    children: [
      {
        name: "@AUTH:SIGNIN",
        path: "/auth/signin",
        exact: true,
        component: loadable(() => import("@/client/pages/auth/pages/signin")),
      },
      {
        name: "@AUTH:SIGNUP",
        path: "/auth/signup",
        exact: true,
        component: loadable(() => import("@/client/pages/auth/pages/signup")),
      },
      {
        name: "@AUTH:FORGOT",
        path: "/auth/forgot",
        exact: true,
        component: loadable(() => import("@/client/pages/auth/pages/forgot")),
      },
    ],
  },
];
