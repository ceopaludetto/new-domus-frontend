import type { ComponentType } from "react";

import type { LoadableComponent } from "@loadable/component";

import { routes } from "../providers/routes";
import { findRoute } from "./routes";
import type { IsomorphicLib, PreloadOptions, WithFetchBefore } from "./types";

export function getModule<T>(lib: IsomorphicLib<T>) {
  if ("default" in lib) {
    return lib.default;
  }

  return lib;
}

export function hasFetchBefore<T>(c?: T): c is WithFetchBefore<T> {
  if (typeof c !== "function") {
    return false;
  }

  if ("fetchBefore" in c) {
    return true;
  }

  return false;
}

export function addPrefetch<T>(component: T, callback: WithFetchBefore<T>["fetchBefore"]): WithFetchBefore<T> {
  (component as any).fetchBefore = callback;

  return component as WithFetchBefore<T>;
}

export async function preload(component: LoadableComponent<any>, options: PreloadOptions): Promise<ComponentType<any>>;
export async function preload(path: string, options: PreloadOptions): Promise<ComponentType<any>[]>;
export async function preload(
  pathOrComponent: string | LoadableComponent<any>,
  options: PreloadOptions
): Promise<ComponentType<any>[] | ComponentType<any>> {
  if (typeof pathOrComponent === "string") {
    const matchingRoute = findRoute(pathOrComponent, routes, []);

    return Promise.all(
      matchingRoute.map(async (m) => {
        const component = await m.component.load();

        const c = getModule(component);

        if (hasFetchBefore(c) && c.fetchBefore) {
          await c.fetchBefore(options);
        }

        return c;
      })
    );
  }

  const component = await pathOrComponent.load();

  const c = getModule<ComponentType<any>>(component);

  if (hasFetchBefore(c) && c.fetchBefore) {
    await c.fetchBefore(options);
  }

  return c;
}
