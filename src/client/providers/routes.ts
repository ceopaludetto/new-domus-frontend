import loadable from "@loadable/component";

import { Route } from "@/client/utils/common.dto";

export const routes: Route[] = [
  {
    name: "main",
    path: "/",
    exact: true,
    component: loadable(() => import("@/client/pages/main")),
  },
  {
    name: "b",
    path: "/b",
    exact: true,
    component: loadable(() => import("@/client/pages/b")),
  },
];
