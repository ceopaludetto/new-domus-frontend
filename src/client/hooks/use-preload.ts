import * as React from "react";
import { useHistory } from "react-router-dom";

import { useApolloClient } from "@apollo/react-hooks";

import { ProgressContext } from "@/client/providers/progress";
import { preload } from "@/client/utils/preload";

export function usePreload<T>(to: string, nested = false, onClick?: (e: React.MouseEvent<T, MouseEvent>) => void) {
  const { start, changeStep, step, done } = React.useContext(ProgressContext);
  const client = useApolloClient();
  const history = useHistory();

  return async function handleClick(e: React.MouseEvent<T, MouseEvent>) {
    if (!e.defaultPrevented) {
      e.preventDefault();
    }

    try {
      start();
      await preload(to, { client, nested, changeStep, step });
      done();

      if (onClick) {
        onClick(e);
      }

      history.push(to);
    } catch (error) {
      console.error("[PRELOAD] error", error); // eslint-disable-line no-console
    }
  };
}
