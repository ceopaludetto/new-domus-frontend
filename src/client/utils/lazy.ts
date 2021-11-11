import type { LoadableComponent } from "@loadable/component";

import type { LazyModule, PageComponent } from "./types";

export function isLazyModule<T = any>(m: any): m is LazyModule<T> {
  return "default" in m && typeof m.default === "function";
}

export function isLoadable(component: any): component is LoadableComponent<any> {
  return "load" in component;
}

export function hasFetchBefore(component: any): component is PageComponent {
  return "fetchBefore" in component;
}
