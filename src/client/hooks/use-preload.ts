import * as React from "react";
import { useHistory } from "react-router-dom";

import { useApolloClient } from "@apollo/client";
import type { LoadableComponent } from "@loadable/component";

import { ProgressContext } from "@/client/providers/progress";
import { getModule, hasFetchBefore } from "@/client/utils/lazy";
import { preload } from "@/client/utils/preload";

export function usePreload<T>(onClick?: (e: React.MouseEvent<T, MouseEvent>) => void) {
  const { toggle } = React.useContext(ProgressContext);
  const client = useApolloClient();
  const history = useHistory();

  async function handlePreloadComponent(component: LoadableComponent<any>) {
    toggle();
    const loaded = await component.load();

    const c = getModule(component);

    if (hasFetchBefore(c)) {
      await c.fetchBefore(client);
    }

    toggle();

    return loaded;
  }

  async function handlePreload(to: string) {
    toggle();
    const component = await preload(to, { client });
    toggle();

    return component;
  }

  function handlePreloadClick(to: string) {
    return async (e: React.MouseEvent<T, MouseEvent>) => {
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
