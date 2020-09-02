import * as React from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { useDebounce } from "react-use";

import { NProgress } from "@tanem/react-nprogress";
import clsx from "clsx";

import { ProgressContext } from "@/client/providers/progress";
import type { Colors } from "@/client/utils/common.dto";

import { NoSsr } from "../no-ssr";
import s from "./index.scss";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
  color?: keyof Colors;
}

export function ProgressBar({ color = "primary", duration = 150, className, ...rest }: ProgressBarProps) {
  const { isAnimating = false } = React.useContext(ProgressContext);
  const location = useLocation();
  const [currKey, setCurrKey] = React.useState(location.key);

  useDebounce(
    () => {
      setCurrKey(location.key);
    },
    duration * 2,
    [location.key]
  );

  return (
    <NoSsr>
      {typeof window !== "undefined" &&
        createPortal(
          <NProgress minimum={0.1} animationDuration={duration} isAnimating={isAnimating} key={currKey}>
            {({ isFinished, animationDuration, progress }) => (
              <div
                className={clsx(s.progress, className)}
                style={{ opacity: isFinished ? 0 : 1, transition: `opacity ${animationDuration}ms ease-in-out` }}
                {...rest}
              >
                <div
                  className={clsx(s.bar, s[color])}
                  style={{
                    marginLeft: progress ? `${(-1 + progress) * 100}%` : "-101%",
                    transition: `margin-left ${animationDuration}ms ease-in-out`,
                  }}
                >
                  <div className={clsx(s.peg, s[color])} />
                </div>
              </div>
            )}
          </NProgress>,
          document.querySelector("body") as HTMLBodyElement
        )}
    </NoSsr>
  );
}
