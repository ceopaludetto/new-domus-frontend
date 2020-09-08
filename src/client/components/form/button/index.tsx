import * as React from "react";

import clsx from "clsx";

import { Text } from "@/client/components/typography";
import { useRipple } from "@/client/hooks";
import type { Colors } from "@/client/utils/common.dto";
import { merge } from "@/client/utils/merge.refs";

import s from "./index.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  variant?: "contained" | "flat" | "outlined";
  color?: keyof Colors;
  size?: "normal" | "small" | "large";
  disableRipple?: boolean;
  centerRipple?: boolean;
  noTouchRipple?: boolean;
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
      disableRipple = false,
      noTouchRipple = false,
      centerRipple = false,
      disabled,
      className,
      ...rest
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const innerRef = React.useRef<HTMLButtonElement>(null);
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
    useRipple(innerRef, {
      disabled: disableRipple ?? disabled,
      noTouch: noTouchRipple,
      center: centerRipple,
    });

    return (
      <button ref={merge([innerRef, ref])} disabled={disabled} type={type} className={classes} {...rest}>
        <Text variant="button" as="span">
          {children}
        </Text>
      </button>
    );
  }
);
