import type { ComponentType } from "react";
import { matchPath } from "react-router-dom";

import type { LoadableComponent } from "@loadable/component";

import { routes } from "@/client/providers/routes";
import type { Route, Client } from "@/client/utils/types";

import { getModule, hasFetchBefore } from "./lazy";
import { retrieveTo } from "./string";

export function findRoute(path: string, definedRoutes = routes, matching: Route[] = []): Route[] {
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
      return findRoute(base, found.children, matching) as Route[];
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

export async function preload(component: LoadableComponent<any>, options: PreloadOptions): Promise<ComponentType<any>>;
export async function preload(path: string, options: PreloadOptions): Promise<ComponentType<any>[]>;
export async function preload(
  pathOrComponent: string | LoadableComponent<any>,
  { client }: PreloadOptions
): Promise<ComponentType<any>[] | ComponentType<any>> {
  if (typeof pathOrComponent === "string") {
    const matchingRoute = findRoute(pathOrComponent, routes, []);

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

  const component = await pathOrComponent.load();

  const c = getModule<ComponentType<any>>(component);

  if (hasFetchBefore(c)) {
    await c.fetchBefore(client);
  }

  return c;
}

const byNameCache = new Map<string, Route>();

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
