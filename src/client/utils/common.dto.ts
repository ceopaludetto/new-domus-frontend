import { RouteProps } from "react-router-dom";

import { LoadableComponent } from "@loadable/component";
import { ApolloClient } from "apollo-client";

export type Colors = {
  primary: string;
  secondary: string;
  background: string;
  paper: string;
  muted: string;
  error: string;
};

export type Client = ApolloClient<object>;

export type Route = Omit<RouteProps, "component"> & {
  name: string;
  children?: Route[];
  component: LoadableComponent<any> & { fetchBefore?: (client: Client) => Promise<void> };
};

export type RouteComponentProps = {
  routes?: Route[];
};

export type Breakpoints<T> = {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};
