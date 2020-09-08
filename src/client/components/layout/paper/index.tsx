import * as React from "react";

import clsx from "clsx";

import s from "./index.module.scss";

type PaperProps = {
  size?: "large" | "normal";
  square?: boolean;
  outline?: boolean;
  noGutter?: boolean;
  noHorizontalBorders?: boolean;
  noVerticalBorders?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const Paper = React.forwardRef(
  (
    {
      children,
      className,
      square = false,
      size = "normal",
      outline = false,
      noGutter = false,
      noHorizontalBorders = false,
      noVerticalBorders = false,
      ...rest
    }: PaperProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classes = clsx(
      s.paper,
      s[size],
      {
        [s.square]: square,
        [s.outline]: outline,
        [s["no-gutter"]]: noGutter,
        [s["no-horizontal-borders"]]: noHorizontalBorders,
        [s["no-vertical-borders"]]: noVerticalBorders,
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
