import * as React from "react";

import clsx from "clsx";

import u from "@/client/styles/utils.scss";

import s from "./index.scss";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  fluid?: boolean;
}

export function Container({ children, fluid = false, className, ...rest }: ContainerProps) {
  const classes = clsx(
    s.container,
    {
      [s.fluid]: fluid,
    },
    u["px-xs-4"],
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
