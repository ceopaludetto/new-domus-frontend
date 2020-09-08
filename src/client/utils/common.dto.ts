import type { RouteProps, RouteComponentProps as DefaultRouteComponentProps } from "react-router-dom";

import type { ApolloClient } from "@apollo/client";
import type { LoadableComponent } from "@loadable/component";

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

export type Typography =
  | "overline"
  | "caption"
  | "button"
  | "body-1"
  | "body-2"
  | "subtitle-1"
  | "subtitle-2"
  | "headline-1"
  | "headline-2"
  | "headline-3"
  | "headline-4"
  | "headline-5"
  | "headline-6";

export type Client = ApolloClient<Record<string, any>>;

export type Route = Omit<RouteProps, "component" | "render"> & {
  name: string;
  children?: Route[];
  component: LoadableComponent<any> & { fetchBefore?: (client: Client) => Promise<void> };
  meta?: Record<string, any>;
  render?: (custom: any) => RouteProps["render"];
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

export type IsomorphicLib<T> = { default: T } | T;

export interface Locale {
  name: string;
  weekdays?: string[];
  months?: string[];
  weekStart?: number;
  weekdaysShort?: string[];
  monthsShort?: string[];
  weekdaysMin?: string[];
  ordinal?: (n: number) => number | string;
  formats: Partial<{
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
  }>;
  relativeTime: Partial<{
    future: string;
    past: string;
    s: string;
    m: string;
    mm: string;
    h: string;
    hh: string;
    d: string;
    dd: string;
    M: string;
    MM: string;
    y: string;
    yy: string;
  }>;
}

export type PropsOf<
  E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>;
