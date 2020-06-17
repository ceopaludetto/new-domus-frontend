import * as React from "react";

import clsx from "clsx";

import { Colors } from "@/client/utils/common.dto";

import s from "./index.scss";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  color?: keyof Colors;
  noMargin?: boolean;
}

export function Label({ children, className, color = "background", noMargin = false, htmlFor, ...rest }: LabelProps) {
  const classes = clsx(s.label, s[color], noMargin && s["no-margin"], className);

  return (
    <label htmlFor={htmlFor} className={classes} {...rest}>
      {children}
    </label>
  );
}
