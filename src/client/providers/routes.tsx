import { BiBuildings } from "react-icons/bi";
import { FiHome, FiCalendar, FiMapPin } from "react-icons/fi";
import { RiSettings2Line } from "react-icons/ri";

import loadable from "@loadable/component";

import type { Route } from "@/client/utils/types";

export const routes: Route[] = [
  {
    name: "@MAIN",
    path: ["/", "/about"],
    exact: true,
    component: loadable(() => import("@/client/pages/main")),
    children: [
      {
        name: "@MAIN:HOME",
        path: "/",
        exact: true,
        component: loadable(() => import("@/client/pages/main/pages/home")),
        meta: {
          displayName: "Home",
          type: "company",
        },
      },
      {
        name: "@MAIN:ABOUT",
        path: "/about",
        exact: true,
        component: loadable(() => import("@/client/pages/main/pages/about")),
        meta: {
          displayName: "About",
          type: "company",
        },
      },
    ],
  },
  {
    name: "@AUTH",
    path: ["/auth/signin", "/auth/signup", "/auth/forgot"],
    exact: true,
    component: loadable(() => import("@/client/pages/auth")),
    meta: {
      needAuth: false,
      redirectTo: "/app",
    },
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
        path: "/auth/signup",
        exact: true,
        component: loadable(() => import("@/client/pages/auth/pages/signup")),
      },
    ],
  },
  {
    name: "@APP",
    path: [
      "/app",
      "/app/events",
      "/app/locals",
      "/app/blocks",
      "/app/blocks/create",
      "/app/settings",
      "/app/settings/condominium",
      "/app/settings/appearance",
    ],
    exact: true,
    component: loadable(() => import("@/client/pages/app")),
    meta: {
      needAuth: true,
      redirectTo: "/auth/signin",
      displayName: "Início",
    },
    children: [
      {
        name: "@APP:HOME",
        path: "/app",
        exact: true,
        component: loadable(() => import("@/client/pages/app/pages/home")),
        meta: {
          displayName: "Início",
          icon: FiHome,
        },
      },
      {
        name: "@APP:EVENTS",
        path: "/app/events",
        exact: true,
        component: loadable(() => import("@/client/pages/app/pages/events")),
        meta: {
          displayName: "Eventos",
          icon: FiCalendar,
        },
      },
      {
        name: "@APP:LOCALS",
        path: "/app/locals",
        exact: true,
        component: loadable(() => import("@/client/pages/app/pages/locals")),
        meta: {
          displayName: "Locais",
          icon: FiMapPin,
        },
      },
      {
        name: "@APP:BLOCKS",
        path: ["/app/blocks", "/app/blocks/create"],
        exact: true,
        component: loadable(() => import("@/client/pages/app/pages/block")),
        meta: {
          displayName: "Blocos e Apartamentos",
          icon: BiBuildings,
        },
        children: [
          {
            name: "@APP:BLOCKS:LIST",
            path: "/app/blocks",
            exact: true,
            component: loadable(() => import("@/client/pages/app/pages/block/pages/list")),
            meta: {
              displayName: "Blocos e Apartamentos",
            },
          },
          {
            name: "@APP:BLOCKS:CREATE",
            path: "/app/blocks/create",
            exact: true,
            component: loadable(() => import("@/client/pages/app/pages/block/pages/create")),
            meta: {
              displayName: "Criar",
            },
          },
        ],
      },
      {
        name: "@APP:SETTINGS",
        path: ["/app/settings", "/app/settings/condominium", "/app/settings/appearance"],
        exact: true,
        component: loadable(() => import("@/client/pages/app/pages/settings")),
        meta: {
          displayName: "Configurações",
          icon: RiSettings2Line,
          hidden: true,
        },
        children: [
          {
            name: "@APP:SETTINGS:PERSONAL",
            path: "/app/settings",
            exact: true,
            component: loadable(() => import("@/client/pages/app/pages/settings/pages/personal")),
            meta: {
              displayName: "Informações Pessoais",
            },
          },
          {
            name: "@APP:SETTINGS:CONDOMINIUM",
            path: "/app/settings/condominium",
            exact: true,
            component: loadable(() => import("@/client/pages/app/pages/settings/pages/condominium")),
            meta: {
              displayName: "Condomínio",
            },
          },
          {
            name: "@APP:SETTINGS:APPEARANCE",
            path: "/app/settings/appearance",
            exact: true,
            component: loadable(() => import("@/client/pages/app/pages/settings/pages/appearance")),
            meta: {
              displayName: "Aparência",
            },
          },
        ],
      },
    ],
  },
];
