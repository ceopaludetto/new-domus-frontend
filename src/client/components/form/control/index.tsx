import * as React from "react";

import clsx from "clsx";

import { Text } from "@/client/components/typography";
import type { Colors } from "@/client/utils/common.dto";

import s from "./index.module.scss";

export interface ControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  color?: keyof Colors;
  margin?: boolean;
  append?: React.ReactElement<{ size?: "small" | "normal" }>;
  error?: boolean;
  helperText?: React.ReactNode | string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  containerRef?: React.Ref<HTMLDivElement>;
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
      labelProps,
      containerRef,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={clsx({ [s["form-group"]]: margin }, className)}>
        <div ref={containerRef} className={clsx(s.container, s[color])}>
          <input
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${id}-error` : undefined}
            ref={ref}
            className={s.input}
            id={id}
            placeholder={placeholder}
            required={required}
            {...rest}
          />
          {label && (
            <Text as="label" className={clsx(s.label, error && s.error)} htmlFor={id} {...labelProps}>
              {label}
              {required && " *"}
            </Text>
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
          <Text as="span" variant="body-2" id={`${id}-error`} className={clsx(s.helper, error && s.error)}>
            {helperText}
          </Text>
        )}
      </div>
    );
  }
);
