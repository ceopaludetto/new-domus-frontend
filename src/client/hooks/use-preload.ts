import type { ComponentType, MouseEvent } from "react";
import { useHistory } from "react-router-dom";

import { useApolloClient } from "@apollo/client";
import type { LoadableComponent } from "@loadable/component";

import { isProgressAnimating } from "@/client/providers/reactive-vars";
import { preload } from "@/client/utils/preload";

const PreloadCache = new Map<string, ComponentType<any>[]>();
const PreloadComponentCache = new Map<LoadableComponent<any>, ComponentType<any>>();

export function usePreload<T>(onClick?: (e: MouseEvent<T, MouseEvent>) => void) {
  const client = useApolloClient();
  const history = useHistory();

  async function handlePreloadComponent(component: LoadableComponent<any>) {
    if (PreloadComponentCache.has(component)) return PreloadComponentCache.get(component);

    isProgressAnimating(true);

    const loaded = await preload(component, { client });
    PreloadComponentCache.set(component, loaded);

    isProgressAnimating(false);

    return loaded;
  }

  async function handlePreload(to: string) {
    if (PreloadCache.has(to)) return PreloadCache.get(to);

    isProgressAnimating(true);

    const component = await preload(to, { client, url: to });
    PreloadCache.set(to, component);

    isProgressAnimating(false);

    return component;
  }

  function handlePreloadClick(to: string) {
    return async (e: MouseEvent<T, MouseEvent>) => {
      if (!e.defaultPrevented) {
        e.preventDefault();
      }

      try {
        await handlePreload(to);

        if (onClick) {
          onClick(e);
        }

        history.push(to);
      } catch (error) {
        console.error("[PRELOAD] error", error); // eslint-disable-line no-console
      }
    };
  }

  return { handlePreloadClick, handlePreloadComponent, handlePreload };
}
