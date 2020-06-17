import * as React from "react";
import { matchPath } from "react-router-dom";

import type { useProgress } from "@/client/hooks/use-progress";
import { routes } from "@/client/providers/routes";
import { Route, Client } from "@/client/utils/common.dto";

const isDefaultExported = (component: any): component is { default: React.ComponentType<any> } =>
  "default" in component;

const isRouteArray = (r: Route | Route[]): r is Route[] => Array.isArray(r);

function findRoute(path: string, proutes: Route[], matching?: Route[]): Route | Route[] {
  if (Array.isArray(matching)) {
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
  } else {
    const matchingRoute = proutes.find((r) =>
      matchPath(path, {
        path: r.path,
        exact: r.exact,
        strict: r.strict,
        sensitive: r.sensitive,
      })
    );

    if (matchingRoute) {
      if (matchingRoute.children) {
        return findRoute(path, matchingRoute.children) as Route;
      }

      return matchingRoute as Route;
    }
  }

  throw new Error("Route not find");
}

interface PreloadOptions {
  nested?: boolean;
  client: Client;
  changeStep: ReturnType<typeof useProgress>["changeStep"];
  step: ReturnType<typeof useProgress>["step"];
}

export async function preload(path: string, { nested = false, client, changeStep, step }: PreloadOptions) {
  const matchingRoute = findRoute(path, routes, nested ? [] : undefined);

  if (isRouteArray(matchingRoute)) {
    await Promise.all(
      matchingRoute.map(async (m) => {
        const component = await m.component.load();

        const c = isDefaultExported(component) ? component.default : component;

        if (step !== 1) {
          changeStep(1);
        }
        await (c as any)?.fetchBefore?.(client);
      })
    );
  } else if (matchingRoute?.component?.load) {
    const component = await matchingRoute.component.load();

    const c = isDefaultExported(component) ? component.default : component;

    changeStep(1);
    await (c as any)?.fetchBefore?.(client);
  }
}
