import * as React from "react";

import clsx from "clsx";

import { Colors } from "@/client/utils/common.dto";

import s from "./index.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  variant?: "contained" | "flat" | "raised";
  color?: keyof Colors;
}

export function Button({ children, variant = "contained", color = "primary", block = false, ...rest }: ButtonProps) {
  const classes = clsx(s.button, s[variant], s[color], {
    [s.block]: block,
  });

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
