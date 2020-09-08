import { matchPath } from "react-router-dom";

import { routes } from "@/client/providers/routes";
import type { Route, Client } from "@/client/utils/common.dto";

import { getModule, hasFetchBefore } from "./lazy";

export function findRoute(path: string, proutes: Route[], matching: Route[]): Route[] {
  const matchingRoute = proutes.find((r) =>
    matchPath(path, {
      path: r.path,
      exact: r.exact,
      strict: r.strict,
      sensitive: r.sensitive,
    })
  );

  if (matchingRoute) {
    matching.push(matchingRoute);

    if (matchingRoute.children?.length) {
      return findRoute(path, matchingRoute.children, matching) as Route[];
    }

    return matching as Route[];
  }

  throw new Error("Route not find");
}

interface PreloadOptions {
  client: Client;
}

export async function preload(path: string, { client }: PreloadOptions) {
  const matchingRoute = findRoute(path, routes, []);

  await Promise.all(
    matchingRoute.map(async (m) => {
      const component = await m.component.load();

      const c = getModule(component);

      if (hasFetchBefore(c)) {
        await c.fetchBefore(client);
      }
    })
  );
}
