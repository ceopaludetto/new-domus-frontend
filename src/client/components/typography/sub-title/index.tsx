import * as React from "react";

import clsx from "clsx";

import { Colors } from "@/client/utils/common.dto";

import s from "./index.scss";

interface SubTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  color?: keyof Colors;
}

export function SubTitle({ children, color = "primary", className, ...rest }: SubTitleProps) {
  const classes = clsx(s["sub-title"], s[color], className);

  return (
    <h2 className={classes} {...rest}>
      {children}
    </h2>
  );
}
