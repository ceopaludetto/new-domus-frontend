import * as React from "react";

import clsx from "clsx";

import { Colors } from "@/client/utils/common.dto";

import s from "./index.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  variant?: "contained" | "flat" | "raised";
  color?: keyof Colors;
  size?: "normal" | "small";
}

export function Button({
  children,
  variant = "contained",
  color = "primary",
  block = false,
  size = "normal",
  type = "button",
  className,
  ...rest
}: ButtonProps) {
  const classes = clsx(
    s.button,
    s[size],
    s[variant],
    s[color],
    {
      [s.block]: block,
    },
    className
  );

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
