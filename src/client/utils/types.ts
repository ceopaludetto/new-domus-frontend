import type { ReactNode, FunctionComponent } from "react";
import type { RouteProps, RouteComponentProps as DefaultRouteComponentProps } from "react-router-dom";

import type { ApolloClient } from "@apollo/client";
import type { LoadableComponent } from "@loadable/component";
import type { Theme } from "@material-ui/core";

export interface PreloadOptions {
  client: ApolloClient<any>;
  url?: string;
}

export type WithFetchBefore<T> = T & { fetchBefore?: (options: PreloadOptions) => Promise<void> };

export type Route = Omit<RouteProps, "component" | "render"> & {
  name: string;
  children?: Route[];
  component: WithFetchBefore<LoadableComponent<any>>;
  meta?: {
    needAuth?: boolean;
    redirectTo?: string;
    title?: string;
    icon?: ReactNode;
  };
  render?: (custom: any) => RouteProps["render"];
};

export interface ReactStaticContext {
  url?: string;
  statusCode?: number;
}

export type RouteComponentProps<P = Record<string, any>, C = ReactStaticContext, S = unknown> = {
  routes?: Route[];
} & DefaultRouteComponentProps<P, C, S>;

export type IsomorphicLib<T> = { default: T } | T;

export enum Gender {
  M = "M",
  F = "F",
  N = "N",
}

export type ColorMode = "dark" | "light" | "blue";

export type ColorModeMap = {
  [K in ColorMode]: { name: string; color: string; theme: Partial<Theme["palette"]> };
};

export type Sidebar =
  | {
      type: "route";
      routeName: string;
    }
  | {
      type: "submenu";
      key: string;
      title: ReactNode;
      children?: Sidebar[];
      icon: FunctionComponent<any>;
    };
