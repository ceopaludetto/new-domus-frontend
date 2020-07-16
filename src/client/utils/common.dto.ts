import { RouteProps } from "react-router-dom";

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
