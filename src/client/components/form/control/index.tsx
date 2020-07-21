import * as React from "react";

import clsx from "clsx";

import { Colors } from "@/client/utils/common.dto";

import s from "./index.scss";

export interface ControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  color?: keyof Colors;
  margin?: boolean;
  append?: React.ReactElement<{ size?: "small" | "normal" }>;
  error?: boolean;
  helperText?: React.ReactNode | string;
}

export const Control = React.forwardRef<HTMLInputElement, ControlProps>(
  (
    {
      margin = true,
      placeholder = " ",
      error = false,
      id,
      label,
      required,
      append,
      helperText,
      color = "primary",
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={clsx({ [s["form-group"]]: margin }, className)}>
        <div className={clsx(s.container, s[color])}>
          <input
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${id}-error` : undefined}
            ref={ref}
            className={s.input}
            id={id}
            placeholder={placeholder}
            {...rest}
          />
          {label && (
            <label className={clsx(s.label, error && s.error)} htmlFor={id}>
              {label}
              {required && " *"}
            </label>
          )}
          {append && (
            <div className={s.append}>
              {React.cloneElement(append, {
                size: "small",
                ...(error && { color: "error" }),
              })}
            </div>
          )}
          <div className={clsx(s.effect, s[color], error && s.error)} />
        </div>
        {helperText && (
          <div id={`${id}-error`} className={clsx(s.helper, error && s.error)}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);
