import { useCallback } from "react";
import { useHistory } from "react-router-dom";

import { useApolloClient } from "@apollo/client";

import { preload } from "@/client/utils/lazy";

export function usePreload<T = HTMLAnchorElement>(onClick?: (e: React.MouseEvent<T, MouseEvent>) => void) {
  const client = useApolloClient();
  const history = useHistory();

  const preloadComponent = useCallback(
    async (to: string) => {
      const component = await preload(to, { client, url: to });

      return component;
    },
    [client]
  );

  const preloadAndPush = useCallback(
    async (to: string) => {
      await preload(to, { client, url: to });

      history.push(to);
    },
    [client, history]
  );

  const preloadClick = useCallback(
    (to: string) => async (e: React.MouseEvent<T, MouseEvent>) => {
      if (!e.defaultPrevented) {
        e.preventDefault();
      }

      try {
        await preloadComponent(to);

        if (onClick) {
          onClick(e);
        }

        history.push(to);
      } catch (error) {
        console.error("Preload error", error);
      }
    },
    [onClick, preloadComponent, history]
  );

  return { preload: preloadComponent, preloadAndPush, preloadClick };
}
