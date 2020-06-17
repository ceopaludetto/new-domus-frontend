import * as React from "react";
import * as ReactDOM from "react-dom";

import clsx from "clsx";

import { ProgressContext } from "@/client/providers/progress";
import { Colors } from "@/client/utils/common.dto";

import { NoSsr } from "../no-ssr";
import s from "./index.scss";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: keyof Colors;
}

export function ProgressBar({ color = "primary", className, ...rest }: ProgressBarProps) {
  const { progress, freezed, wait } = React.useContext(ProgressContext);
  const classes = clsx(s.progress, className);

  function resolveOpacity() {
    if (!freezed) return 1;

    if (progress === 0 && freezed) return 0;
    if (progress === 100 && !wait) return 0;

    return 1;
  }

  return (
    <NoSsr>
      {typeof window !== "undefined" &&
        ReactDOM.createPortal(
          <div className={classes} {...rest}>
            <div className={clsx(s.bar, s[color])} style={{ width: `${progress}%`, opacity: resolveOpacity() }}>
              <div className={clsx(s.peg, s[color])} />
            </div>
          </div>,
          document.querySelector("body") as HTMLBodyElement
        )}
    </NoSsr>
  );
}
