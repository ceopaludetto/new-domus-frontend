import * as React from "react";

import clsx from "clsx";

import s from "./index.scss";

interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "large" | "normal";
  outline?: boolean;
  noGutter?: boolean;
  noHorizontalBorders?: boolean;
}

export function Paper({
  children,
  className,
  size = "normal",
  outline = false,
  noGutter = false,
  noHorizontalBorders = false,
  ...rest
}: PaperProps) {
  const classes = clsx(
    s.paper,
    s[size],
    {
      [s.outline]: outline,
      [s["no-gutter"]]: noGutter,
      [s["no-horizontal-borders"]]: noHorizontalBorders,
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
