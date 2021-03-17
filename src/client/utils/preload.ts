import { matchPath } from "react-router-dom";

import { routes } from "@/client/providers/routes";
import type { Route, Client } from "@/client/utils/types";

import { getModule, hasFetchBefore } from "./lazy";
import { retrieveTo } from "./string";

export function findRoute(path: string, definedRoutes = routes, matching: Route[] = []): Route[] {
  const [base] = path.split("?");

  const matchingRoute = definedRoutes.find((r) =>
    matchPath(base, {
      path: r.path,
      exact: r.exact,
      strict: r.strict,
      sensitive: r.sensitive,
    })
  );

  if (matchingRoute) {
    matching.push(matchingRoute);

    if (matchingRoute.children?.length) {
      return findRoute(base, matchingRoute.children, matching) as Route[];
    }
  }

  return matching as Route[];
}

export function removeDuplicate(foundRoutes: Route[]) {
  const map: Record<string, Route> = {};

  foundRoutes.forEach((route) => {
    const path = retrieveTo(route.path);

    if (!map[path]) {
      map[path] = route;
    }
  });

  return Object.values(map);
}

interface PreloadOptions {
  client: Client;
}

export async function preload(path: string, { client }: PreloadOptions) {
  const matchingRoute = findRoute(path, routes, []);

  return Promise.all(
    matchingRoute.map(async (m) => {
      const component = await m.component.load();

      const c = getModule(component);

      if (hasFetchBefore(c)) {
        await c.fetchBefore(client);
      }

      return c;
    })
  );
}

export function findRouteByName(name: string, definedRoutes = routes) {
  let found: Route | undefined;

  definedRoutes.forEach((route) => {
    if (route.name === name) {
      found = route;
    }

    if (route.children?.length && !found) {
      const innerFound = findRouteByName(name, route.children);

      if (innerFound) {
        found = innerFound;
      }
    }
  });

  return found;
}
