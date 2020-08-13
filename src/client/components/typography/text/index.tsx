import * as React from "react";

import clsx from "clsx";

import u from "@/client/styles/utils.scss";
import type { Typography, Colors } from "@/client/utils/common.dto";

import s from "./index.scss";

type TextProps<T extends React.ElementType<any> = "p"> = {
  as?: T;
  variant?: Typography;
  color?: keyof Colors;
  link?: boolean;
  gutter?: boolean;
} & React.ComponentProps<T>;

export function Text<T extends React.ElementType<any> = "p">({
  as: Component = "p",
  children,
  className,
  color,
  link = false,
  gutter = false,
  variant = "body-1",
  ...rest
}: TextProps<T>) {
  const classes = clsx(
    s[variant],
    color && s[color],
    link && s.link,
    gutter && [u["mt-xs-2"], u["mb-xs-7"]],
    className
  );

  if (link) {
    Component = "a";
  }

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
