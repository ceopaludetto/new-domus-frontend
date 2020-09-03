import { FiHome, FiCalendar, FiMapPin } from "react-icons/fi";

import loadable from "@loadable/component";

import type { Route } from "@/client/utils/common.dto";

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
    path: ["/auth/signin", "/auth/signup/step-1", "/auth/signup/step-2", "/auth/signup/step-3", "/auth/forgot"],
    exact: true,
    component: loadable(() => import("@/client/pages/auth")),
    meta: {
      logged: false,
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
  {
    name: "@APP",
    path: ["/app", "/app/events", "/app/locals", "/app/settings", "/app/settings/condominium"],
    exact: true,
    component: loadable(() => import("@/client/pages/app")),
    meta: {
      logged: true,
      redirectTo: "/auth/signin",
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
        name: "@APP:HOME:EVENTS",
        path: "/app/events",
        exact: true,
        component: loadable(() => import("@/client/pages/app/pages/events")),
        meta: {
          displayName: "Eventos",
          icon: FiCalendar,
        },
      },
      {
        name: "@APP:HOME:LOCALS",
        path: "/app/locals",
        exact: true,
        component: loadable(() => import("@/client/pages/app/pages/locals")),
        meta: {
          displayName: "Locais",
          icon: FiMapPin,
        },
      },
      {
        name: "@APP:SETTINGS",
        path: ["/app/settings", "/app/settings/condominium"],
        exact: true,
        component: loadable(() => import("@/client/pages/app/pages/settings")),
        meta: {
          displayName: "Configurações",
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
        ],
      },
    ],
  },
];
