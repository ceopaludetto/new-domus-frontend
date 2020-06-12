import * as React from "react";

import clsx from "clsx";

import s from "./index.scss";

interface BlurredProps extends React.HTMLAttributes<HTMLDivElement> {
  deactive?: boolean;
  border?: boolean;
}

export function Blurred({ deactive = false, className, children, border = false, ...rest }: BlurredProps) {
  const classes = clsx(
    s.blurred,
    {
      [s.deactive]: deactive,
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
