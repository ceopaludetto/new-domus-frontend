import * as React from "react";
import { useLocation } from "react-router-dom";
import { useDebounce } from "react-use";

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
  const [currKey, setCurrKey] = React.useState(location.key);
  const ref = React.useRef<HTMLBodyElement>(null);
  const classes = useStyles();

  useDebounce(
    () => {
      setCurrKey(location.key);
    },
    duration * 2,
    [location.key]
  );

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const body = document.querySelector("body");
      (ref as any).current = body;
    }
  }, []);

  return (
    <NoSsr>
      <Portal container={ref.current}>
        <NProgress minimum={0.1} animationDuration={duration} isAnimating={isAnimating} key={currKey}>
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
