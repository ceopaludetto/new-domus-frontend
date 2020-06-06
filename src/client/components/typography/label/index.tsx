import * as React from "react";

import clsx from "clsx";

import { Colors } from "@/client/utils/common.dto";

import s from "./index.scss";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  color?: keyof Colors;
}

export function Label({ children, className, color = "background", htmlFor, ...rest }: LabelProps) {
  const classes = clsx(s.label, s[color], className);

  return (
    <label htmlFor={htmlFor} className={classes} {...rest}>
      {children}
    </label>
  );
}
