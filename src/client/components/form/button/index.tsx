import React from "react";

import clsx from "clsx";

import s from "./index.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ type = "button", children, className, ...rest }: ButtonProps) {
  return (
    <button type={type} className={clsx(s.button, className)} {...rest}>
      {children}
    </button>
  );
}
