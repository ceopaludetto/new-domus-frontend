import { RouteProps } from "react-router-dom";

import { LoadableComponent } from "@loadable/component";
import { ApolloClient } from "apollo-client";

export type Colors = {
  primary: string;
  secondary: string;
  background: string;
  paper: string;
  muted: string;
};

export type Client = ApolloClient<object>;

export type Route = Omit<RouteProps, "component"> & {
  name: string;
  children?: Route[];
  component: LoadableComponent<any> & { fetchBefore?: (client: Client) => Promise<void> };
};
