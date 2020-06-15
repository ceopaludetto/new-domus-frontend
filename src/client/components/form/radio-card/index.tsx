import * as React from "react";

import clsx from "clsx";

import { Colors } from "@/client/utils/common.dto";

import { Label } from "../../typography";
import s from "./index.scss";

interface RadioCardProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  color?: keyof Colors;
  error?: boolean;
  helperText?: React.ReactNode | string;
}

export const RadioCard = React.forwardRef<HTMLInputElement, RadioCardProps>(
  ({ color = "primary", error, helperText, id, label, className, ...rest }, ref) => {
    const classes = clsx(s["radio-card"], s[color], error && s.error, className);

    return (
      <>
        <div className={classes}>
          <input className={s.input} ref={ref} type="radio" {...rest} />
          <div className={clsx(s.radio, s[color])} />
          {label && (
            <Label noMargin htmlFor={id}>
              {label}
            </Label>
          )}
        </div>
        {helperText && <div className={clsx(s.helper, error && s.error)}>{helperText}</div>}
      </>
    );
  }
);
