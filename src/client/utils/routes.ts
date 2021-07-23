import { matchPath } from "react-router-dom";

import { routes } from "../providers/routes";
import { retrieveTo } from "./string";
import type { Route } from "./types";

const byPathCache = new Map<string, Route[]>();
const byNameCache = new Map<string, Route>();

export function findRoute(path: string, definedRoutes = routes, matching: Route[] = []): Route[] {
  if (byPathCache.has(path)) {
    return byPathCache.get(path) ?? [];
  }

  const [base] = path.split("?");

  const found = definedRoutes.find((r) =>
    matchPath(base, {
      path: r.path,
      exact: r.exact,
      strict: r.strict,
      sensitive: r.sensitive,
    })
  );

  if (found) {
    matching.push(found);

    if (found.children?.length) {
      return findRoute(path, found.children, matching) as Route[];
    }
  }

  byPathCache.set(path, matching);

  return matching as Route[];
}

export function removeDuplicate(foundRoutes: Route[]) {
  const map = new Map<string, Route>();

  for (const route of foundRoutes) {
    const path = retrieveTo(route.path);

    if (!map.has(path)) {
      map.set(path, route);
    }
  }

  return Array.from(map.values());
}

export function findRouteByName(name: string, definedRoutes: Route[] = routes) {
  if (byNameCache.has(name)) return byNameCache.get(name);

  let found: Route | undefined;

  for (const route of definedRoutes) {
    if (route.name === name) {
      byNameCache.set(name, route);
      found = route;
    }

    if (route.children?.length && !found) {
      const innerFound = findRouteByName(name, route.children);

      if (innerFound) {
        found = innerFound;
      }
    }
  }

  return found;
}
