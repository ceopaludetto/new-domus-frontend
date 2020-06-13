import * as React from "react";

import clsx from "clsx";

import s from "./index.scss";

type PaperProps<T extends React.ElementType<any> = "div"> = {
  as?: T;
  size?: "large" | "normal";
  outline?: boolean;
  noGutter?: boolean;
  noHorizontalBorders?: boolean;
} & React.ComponentProps<T>;

export function Paper<T extends React.ElementType<any> = "div">({
  as: Component = "div",
  children,
  className,
  size = "normal",
  outline = false,
  noGutter = false,
  noHorizontalBorders = false,
  ...rest
}: PaperProps<T>) {
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
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
