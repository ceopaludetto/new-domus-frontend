import * as React from "react";

import clsx from "clsx";

import s from "./index.scss";

interface BlurredProps extends React.HTMLAttributes<HTMLDivElement> {
  deactivate?: boolean;
  border?: boolean;
}

export function Blurred({ deactivate = false, className, children, border = false, ...rest }: BlurredProps) {
  const classes = clsx(
    s.blurred,
    {
      [s.deactivate]: deactivate,
      [s.border]: border,
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
