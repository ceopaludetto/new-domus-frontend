import { matchRoutes } from "react-router-config";

import type { LoadableComponent } from "@loadable/component";
import type { LocationDescriptor, Location, History } from "history";

import { routes } from "../routes";
import { hasFetchBefore, isLazyModule, isLoadable } from "./lazy";
import type { ApplicationRouteConfig } from "./types";

export function extractPath(to: LocationDescriptor<any>) {
  if (typeof to === "object") {
    return to.pathname;
  }

  return to;
}

export async function preloadRoutes(path: string) {
  const branch = matchRoutes(routes, path);

  const promises = branch.map(async ({ route, match }) => {
    if (isLoadable(route.component)) {
      const m = await route.component.load();

      if (isLazyModule<LoadableComponent<any>>(m)) {
        const component = m.default;
        if (hasFetchBefore(component)) await component.fetchBefore(match);
      }

      return route;
    }

    if (hasFetchBefore(route.component)) await route.component.fetchBefore(match);
    return route;
  });

  return Promise.all(promises);
}

type To = LocationDescriptor<any> | ((location: Location) => LocationDescriptor<any>);

export async function handleLinkClick(history: History, location: Location, to: To) {
  const path = extractPath(typeof to === "function" ? to(location) : to);
  if (!path) return;

  await preloadRoutes(path);
  history.push(path);
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

    if (route.routes && !found) {
      const inner = findRouteByName(name, route.routes);

      if (inner) found = inner;
    }
  }

  return found;
}
