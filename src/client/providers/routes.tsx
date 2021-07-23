import { BiBuildings, BiHomeAlt } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";

import loadable from "@loadable/component";

import type { Route } from "@/client/utils/types";

export const routes: Route[] = [
  {
    name: "@MAIN",
    path: ["/", "/about"],
    exact: true,
    component: loadable(() => import("@/client/pages/main")),
  },
  {
    name: "@AUTH",
    path: ["/auth/signin", "/auth/forgot", "/auth/reset"],
    exact: true,
    component: loadable(() => import("@/client/pages/auth")),
    meta: {
      needAuth: false,
      redirectTo: "/app",
    },
    children: [
      {
        name: "@AUTH:Signin",
        path: "/auth/signin",
        exact: true,
        component: loadable(() => import("@/client/pages/auth/pages/signin")),
      },
      {
        name: "@AUTH:Forgot",
        path: "/auth/forgot",
        exact: true,
        component: loadable(() => import("@/client/pages/auth/pages/forgot")),
      },
      {
        name: "@AUTH:Reset",
        path: "/auth/reset",
        exact: true,
        component: loadable(() => import("@/client/pages/auth/pages/reset")),
      },
    ],
  },
  {
    name: "@APP",
    path: [
      "/app",
      "/app/blocks",
      "/app/blocks/create",
      "/app/locals",
      "/app/locals/create",
      "/app/settings",
      "/app/settings/appearance",
      "/app/settings/condominium",
    ],
    exact: true,
    component: loadable(() => import("@/client/pages/app")),
    meta: {
      needAuth: true,
      redirectTo: "/auth/signin",
      title: "Início",
    },
    children: [
      {
        name: "@APP:Home",
        path: "/app",
        exact: true,
        component: loadable(() => import("@/client/pages/app/pages/home")),
        meta: {
          title: "Início",
          icon: <BiHomeAlt />,
        },
      },
      {
        name: "@APP:Blocks",
        path: ["/app/blocks", "/app/blocks/create"],
        exact: true,
        component: loadable(() => import("@/client/pages/app/pages/blocks")),
        meta: {
          title: "Blocos",
          icon: <BiBuildings />,
        },
        children: [
          {
            name: "@APP:Blocks:List",
            path: "/app/blocks",
            exact: true,
            component: loadable(() => import("@/client/pages/app/pages/blocks/pages/list")),
          },
          {
            name: "@APP:Blocks:Create",
            path: "/app/blocks/create",
            exact: true,
            component: loadable(() => import("@/client/pages/app/pages/blocks/pages/create")),
            meta: {
              title: "Criar Bloco",
            },
          },
        ],
      },
      {
        name: "@APP:Locals",
        path: ["/app/locals", "/app/locals/create"],
        exact: true,
        component: loadable(() => import("@/client/pages/app/pages/locals")),
        meta: {
          title: "Locais",
          icon: <FiMapPin />,
        },
        children: [
          {
            name: "@APP:Locals:List",
            path: "/app/locals",
            exact: true,
            component: loadable(() => import("@/client/pages/app/pages/locals/pages/list")),
          },
        ],
      },
      {
        name: "@APP:Settings",
        path: ["/app/settings", "/app/settings/appearance", "/app/settings/condominium"],
        exact: true,
        component: loadable(() => import("@/client/pages/app/pages/settings")),
        meta: {
          title: "Configurações",
        },
        children: [
          {
            name: "@APP:Settings:Profile",
            path: "/app/settings",
            exact: true,
            component: loadable(() => import("@/client/pages/app/pages/settings/pages/profile")),
          },
          {
            name: "@APP:Settings:Condominium",
            path: "/app/settings/condominium",
            exact: true,
            component: loadable(() => import("@/client/pages/app/pages/settings/pages/condominium")),
            meta: {
              title: "Condomínio",
            },
          },
          {
            name: "@APP:Settings:Appearance",
            path: "/app/settings/appearance",
            exact: true,
            component: loadable(() => import("@/client/pages/app/pages/settings/pages/appearance")),
            meta: {
              title: "Aparência",
            },
          },
        ],
      },
    ],
  },
];
