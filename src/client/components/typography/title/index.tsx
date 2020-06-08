import * as React from "react";

import clsx from "clsx";

import { Colors } from "@/client/utils/common.dto";

import s from "./index.scss";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  color?: keyof Colors;
}

export function Title({ color = "background", className, children, ...rest }: TitleProps) {
  const classes = clsx(s.title, s[color], className);

  return (
    <h1 className={classes} {...rest}>
      {children}
    </h1>
  );
}
