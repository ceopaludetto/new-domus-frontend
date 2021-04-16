import type { ReactNode, FunctionComponent, JSXElementConstructor } from "react";
import type { RouteProps, RouteComponentProps as DefaultRouteComponentProps } from "react-router-dom";

import type { ApolloClient } from "@apollo/client";
import type { LoadableComponent } from "@loadable/component";

export type Client = ApolloClient<Record<string, any>>;

export interface PreloadOptions {
  client: Client;
  url?: string;
}

export type Route = Omit<RouteProps, "component" | "render"> & {
  name: string;
  children?: Route[];
  component: LoadableComponent<any> & {
    fetchBefore?: (options: PreloadOptions) => Promise<void>;
  };
  meta?: Record<string, any>;
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

export type ColorMode = "dark" | "light";

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
