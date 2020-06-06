import * as React from "react";

import clsx from "clsx";

import s from "./index.scss";

interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "large" | "normal";
  outline?: boolean;
}

export function Paper({ children, className, size = "normal", outline = false, ...rest }: PaperProps) {
  const classes = clsx(
    s.paper,
    s[size],
    {
      [s.outline]: outline,
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
