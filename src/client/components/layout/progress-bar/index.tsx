import { useState, useRef, HTMLAttributes } from "react";
import { useEffectOnce, useIsomorphicLayoutEffect } from "react-use";

import { useReactiveVar } from "@apollo/client";
import { Theme, NoSsr, Portal } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { NProgress } from "@tanem/react-nprogress";
import { generate } from "shortid";

import { isProgressAnimating } from "@/client/providers/reactive-vars";

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  duration?: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  progress: {
    pointerEvents: "none",
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: theme.zIndex.modal - 1,
    width: "100%",
  },
  bar: {
    height: "2px",
    width: "100%",
    backgroundColor: theme.palette.primary.main,
  },
  peg: {
    display: "block",
    height: "100%",
    opacity: 1,
    position: "absolute",
    right: 0,
    transform: "rotate(3deg) translate(0, -4px)",
    width: "100px",
    boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`,
  },
}));

export function ProgressBar({ duration = 150, className, ...rest }: ProgressBarProps) {
  const classes = useStyles();

  const isAnimating = useReactiveVar(isProgressAnimating);

  const [key, setKey] = useState(generate());
  const ref = useRef<HTMLBodyElement | null>(null);

  useEffectOnce(() => {
    if (typeof window !== "undefined") {
      const body = document.querySelector("body");
      ref.current = body;
    }
  });

  useIsomorphicLayoutEffect(() => {
    if (isAnimating) {
      setKey(generate());
    }
  }, [isAnimating]);

  return (
    <NoSsr>
      <Portal container={ref.current}>
        <NProgress minimum={0.01} animationDuration={duration} isAnimating={isAnimating} key={key}>
          {({ isFinished, animationDuration, progress }) => (
            <div
              className={classes.progress}
              style={{ opacity: isFinished ? 0 : 1, transition: `opacity ${animationDuration}ms ease-in-out` }}
              {...rest}
            >
              <div
                className={classes.bar}
                style={{
                  marginLeft: progress ? `${(-1 + progress) * 100}%` : "-101%",
                  transition: `margin-left ${animationDuration}ms ease-in-out`,
                }}
              >
                <div className={classes.peg} />
              </div>
            </div>
          )}
        </NProgress>
      </Portal>
    </NoSsr>
  );
}
