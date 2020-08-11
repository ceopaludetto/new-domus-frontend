import * as React from "react";

import clsx from "clsx";

import { Text } from "@/client/components/typography";
import type { Colors } from "@/client/utils/common.dto";

import s from "./index.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  variant?: "contained" | "flat" | "outlined";
  color?: keyof Colors;
  size?: "normal" | "small" | "large";
}

export const Button = React.forwardRef(
  (
    {
      children,
      variant = "contained",
      color = "primary",
      block = false,
      size = "normal",
      type = "button",
      className,
      ...rest
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
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
      <button ref={ref} type={type} className={classes} {...rest}>
        <Text variant="button" as="span">
          {children}
        </Text>
      </button>
    );
  }
);
