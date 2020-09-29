import * as React from "react";
import { useLocation } from "react-router-dom";
import { useEffectOnce } from "react-use";

import { Theme, NoSsr, Portal } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { NProgress } from "@tanem/react-nprogress";

import { ProgressContext } from "@/client/providers/progress";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  progress: {
    pointerEvents: "none",
  },
  bar: {
    left: 0,
    top: 0,
    height: "2px",
    position: "fixed",
    width: "100%",
    zIndex: theme.zIndex.appBar,
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
  const { isAnimating = false } = React.useContext(ProgressContext);
  const location = useLocation();
  const [key, setKey] = React.useState(location.key);
  const ref = React.useRef<HTMLBodyElement | null>(null);
  const classes = useStyles();

  useEffectOnce(() => {
    if (typeof window !== "undefined") {
      const body = document.querySelector("body");
      ref.current = body;
    }
  });

  const handleTransitionEnd = React.useCallback(() => {
    setTimeout(() => {
      setKey(location.key);
    }, 100);
  }, [location.key]);

  return (
    <NoSsr>
      <Portal container={ref.current}>
        <NProgress minimum={0.1} animationDuration={duration} isAnimating={isAnimating} key={key}>
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
                onTransitionEnd={handleTransitionEnd}
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
