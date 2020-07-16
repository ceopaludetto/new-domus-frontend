import * as React from "react";
import { useHistory } from "react-router-dom";

import { useApolloClient } from "@apollo/client";

import { ProgressContext } from "@/client/providers/progress";
import { preload } from "@/client/utils/preload";

type UsePreloadReturn<T> = [(to: string) => (e: React.MouseEvent<T>) => Promise<void>, (to: string) => Promise<void>];

export function usePreload<T>(
  nested = false,
  onClick?: (e: React.MouseEvent<T, MouseEvent>) => void
): UsePreloadReturn<T> {
  const { start, changeStep, step, done } = React.useContext(ProgressContext);
  const client = useApolloClient();
  const history = useHistory();

  async function run(to: string) {
    start();
    await preload(to, { client, nested, changeStep, step });
    done();
  }

  function handleClick(to: string) {
    return async (e: React.MouseEvent<T, MouseEvent>) => {
      if (!e.defaultPrevented) {
        e.preventDefault();
      }

      try {
        await run(to);

        if (onClick) {
          onClick(e);
        }

        history.push(to);
      } catch (error) {
        console.error("[PRELOAD] error", error); // eslint-disable-line no-console
      }
    };
  }

  return [handleClick, run];
}
