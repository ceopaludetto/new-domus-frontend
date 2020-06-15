import * as React from "react";

import clsx from "clsx";

import { Colors } from "@/client/utils/common.dto";

import s from "./index.scss";

type ColorTextProps<T extends React.ElementType<any> = "span"> = {
  as?: T;
  color?: keyof Colors;
  bold?: boolean;
  small?: boolean;
} & React.ComponentProps<T>;

export function ColorText<T extends React.ElementType<any> = "span">({
  children,
  color = "primary",
  className,
  bold = false,
  small = false,
  as: Component = "span",
  ...rest
}: ColorTextProps<T>) {
  const classes = clsx(s[color], bold && s.bold, small && s.small, className);

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
