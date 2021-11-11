import type { IconType } from "react-icons";
import type { match } from "react-router";
import type { RouteConfig } from "react-router-config";

import type { LoadableComponent } from "@loadable/component";

export type ColorMode = "dark" | "light";
export type PageComponent<T = any> = LoadableComponent<T> & { fetchBefore: (match: match) => Promise<void> };
export type LazyModule<T = any> = { default: T; esModule: true };

export interface ApplicationRouteConfig extends RouteConfig {
  name: string;
  routes?: ApplicationRouteConfig[];
}

export type ApplicationSidebarRouteConfig = {
  route: string;
  displayName: string;
  icon: IconType;
};
