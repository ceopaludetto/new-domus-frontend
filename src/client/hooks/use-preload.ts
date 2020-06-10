import * as React from "react";
import { useHistory } from "react-router-dom";

import { useApolloClient } from "@apollo/react-hooks";

import { preload } from "@/client/utils/preload";

export function usePreload<T>(to: string, nested = false, onClick?: (e: React.MouseEvent<T, MouseEvent>) => void) {
  const client = useApolloClient();
  const history = useHistory();

  return async function handleClick(e: React.MouseEvent<T, MouseEvent>) {
    if (!e.defaultPrevented) {
      e.preventDefault();
    }

    try {
      await preload(to, { client, nested });

      if (onClick) {
        onClick(e);
      }

      history.push(to);
    } catch (error) {
      console.error("[PRELOAD] error", error); // eslint-disable-line no-console
    }
  };
}
