import { RouteProps, RouteComponentProps as DefaultRouteComponentProps } from "react-router-dom";

import { ApolloClient } from "@apollo/client";
import { LoadableComponent } from "@loadable/component";

export type Colors = {
  primary: string;
  secondary: string;
  background: string;
  paper: string;
  muted: string;
  error: string;
  success: string;
  text: string;
};

export type Client = ApolloClient<Record<string, any>>;

export type Route = Omit<RouteProps, "component"> & {
  name: string;
  children?: Route[];
  component: LoadableComponent<any> & { fetchBefore?: (client: Client) => Promise<void> };
};

export interface ReactStaticContext {
  url?: string;
  statusCode?: number;
}

export type RouteComponentProps = {
  routes?: Route[];
} & DefaultRouteComponentProps<Record<string, any>, ReactStaticContext>;

export type Breakpoints<T> = {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};
