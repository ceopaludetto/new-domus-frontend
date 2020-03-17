import React from "react";

import clsx from "clsx";

import s from "./index.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  variant?: "contained" | "flat";
  color?: "primary" | "background";
}

export function Button({
  type = "button",
  children,
  className,
  variant = "contained",
  color = "primary",
  block = false,
  ...rest
}: ButtonProps) {
  const classes = clsx(
    s.button,
    s[variant],
    s[color],
    {
      [s["button.block"]]: block
    },
    className
  );

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
