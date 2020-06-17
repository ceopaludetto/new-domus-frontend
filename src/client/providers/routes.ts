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
    path: ["/auth/signin", "/auth/signup/step-1", "/auth/signup/step-2", "/auth/signup/step-3", "/auth/forgot"],
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
        name: "@AUTH:FORGOT",
        path: "/auth/forgot",
        exact: true,
        component: loadable(() => import("@/client/pages/auth/pages/forgot")),
      },
      {
        name: "@AUTH:SIGNUP",
        path: ["/auth/signup/step-1", "/auth/signup/step-2", "/auth/signup/step-3"],
        exact: true,
        component: loadable(() => import("@/client/pages/auth/pages/signup")),
        children: [
          {
            name: "@AUTH:SIGNUP:STEP1",
            path: "/auth/signup/step-1",
            exact: true,
            component: loadable(() => import("@/client/pages/auth/pages/signup/pages/step-1")),
          },
          {
            name: "@AUTH:SIGNUP:STEP2",
            path: "/auth/signup/step-2",
            exact: true,
            component: loadable(() => import("@/client/pages/auth/pages/signup/pages/step-2")),
          },
          {
            name: "@AUTH:SIGNUP:STEP3",
            path: "/auth/signup/step-3",
            exact: true,
            component: loadable(() => import("@/client/pages/auth/pages/signup/pages/step-3")),
          },
        ],
      },
    ],
  },
];
