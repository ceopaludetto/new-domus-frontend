import * as React from "react";

import clsx from "clsx";

import { Colors } from "@/client/utils/common.dto";

import s from "./index.scss";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement<{ size?: number }>;
  size?: "small" | "normal";
  color?: keyof Colors;
}

export function IconButton({
  color = "primary",
  size = "normal",
  type = "button",
  children,
  className,
  ...rest
}: IconButtonProps) {
  const classes = clsx(s.button, s[color], s[size], className);

  return (
    <button type={type} className={classes} {...rest}>
      {React.cloneElement(children, {
        size: 24,
      })}
    </button>
  );
}
