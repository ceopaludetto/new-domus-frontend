import * as React from "react";

import clsx from "clsx";

import { useRipple } from "@/client/hooks";
import type { Colors } from "@/client/utils/common.dto";

import { Text } from "../../typography";
import s from "./index.module.scss";

interface RadioCardProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  color?: keyof Colors;
  error?: boolean;
  helperText?: React.ReactNode | string;
}

export const RadioCard = React.forwardRef<HTMLInputElement, RadioCardProps>(
  ({ color = "primary", error, helperText, id, label, className, ...rest }, ref) => {
    const innerRef = React.useRef<HTMLDivElement>(null);
    const classes = clsx(s["radio-card"], s[color], error && s["has-error"], className);
    useRipple(innerRef);

    return (
      <>
        <div ref={innerRef} className={classes}>
          <input className={s.input} ref={ref} type="radio" {...rest} />
          <div className={clsx(s.radio, s[color])} />
          {label && (
            <Text as="label" htmlFor={id}>
              {label}
            </Text>
          )}
        </div>
        {helperText && (
          <Text as="span" variant="body-2" color={error && "error"} className={s.helper}>
            {helperText}
          </Text>
        )}
      </>
    );
  }
);
