import * as React from "react";

import clsx from "clsx";

import s from "./index.scss";

interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "large" | "normal";
}

export function Paper({ children, className, size = "normal", ...rest }: PaperProps) {
  const classes = clsx(s.paper, s[size], className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
