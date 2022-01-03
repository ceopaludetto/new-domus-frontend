import { matchRoutes, NavigateFunction, To, Location } from "react-router-dom";

import type { LoadableComponent } from "@loadable/component";

import { routes } from "../routes";
import { hasFetchBefore, isLazyModule, isLoadable } from "./lazy";
import type { ApplicationRouteConfig, ApplicationRouteMatch } from "./types";

export function extractPath(to: To) {
  if (typeof to === "object") {
    return to.pathname;
  }

  return to;
}

export async function preloadRoutes(path: string, r = routes) {
  const branch = matchRoutes(r, path) as ApplicationRouteMatch[] | null;
  if (!branch) return [];

  const promises = branch.map(async ({ route, ...rest }) => {
    if (isLoadable(route.component)) {
      const m = await route.component.load();

      if (isLazyModule<LoadableComponent<any>>(m)) {
        const component = m.default;
        if (hasFetchBefore(component)) await component.fetchBefore({ route, ...rest });
      }

      return route;
    }

    return route;
  });

  return Promise.all(promises);
}

export async function handleLinkClick(navigate: NavigateFunction, location: Location, to: To) {
  const path = extractPath(to);
  if (typeof path === "undefined") return;

  await preloadRoutes(path);
  navigate(to);
}

const routeCache = new Map<string, ApplicationRouteConfig>();

export function findRouteByName(name: string, r = routes): ApplicationRouteConfig | undefined {
  if (routeCache.has(name)) {
    return routeCache.get(name) as ApplicationRouteConfig;
  }

  let found: ApplicationRouteConfig | undefined;

  for (const route of r) {
    if (route.name === name) {
      routeCache.set(name, route);
      found = route;
    }

    if (route.children && !found) {
      const inner = findRouteByName(name, route.children);

      if (inner) found = inner;
    }
  }

  return found;
}
