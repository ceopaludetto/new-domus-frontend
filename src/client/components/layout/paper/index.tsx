import * as React from "react";

import clsx from "clsx";

import s from "./index.scss";

type PaperProps = {
  size?: "large" | "normal";
  outline?: boolean;
  noGutter?: boolean;
  noHorizontalBorders?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const Paper = React.forwardRef(
  (
    {
      children,
      className,
      size = "normal",
      outline = false,
      noGutter = false,
      noHorizontalBorders = false,
      ...rest
    }: PaperProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
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
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  }
);
