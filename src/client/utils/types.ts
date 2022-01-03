import type { IconType } from "react-icons";
import type { RouteMatch, RouteObject } from "react-router-dom";

import type { LoadableComponent } from "@loadable/component";

export type ColorMode = "dark" | "light";
export type PageComponent<T = any> = LoadableComponent<T> & { fetchBefore: (match: RouteMatch) => Promise<void> };
export type LazyModule<T = any> = { default: T; esModule: true };

export interface ApplicationRouteConfig extends RouteObject {
  name: string;
  component: LoadableComponent<any>;
  needAuth?: boolean;
  children?: ApplicationRouteConfig[];
}

export interface ApplicationRouteMatch extends RouteMatch {
  route: ApplicationRouteConfig;
}

export type RouteConfig = Omit<ApplicationRouteConfig, "element">;

export type ApplicationSidebarRouteConfig = {
  route: string;
  displayName: string;
  icon: IconType;
  end?: boolean;
};
