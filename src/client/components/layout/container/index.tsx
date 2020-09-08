import * as React from "react";

import clsx from "clsx";

import s from "./index.module.scss";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  fluid?: boolean;
}

export function Container({ children, fluid = false, className, ...rest }: ContainerProps) {
  const classes = clsx(
    s.container,
    {
      [s.fluid]: fluid,
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
