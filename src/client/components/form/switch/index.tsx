import * as React from "react";

import clsx from "clsx";

import { Label } from "@/client/components/typography";
import { Colors } from "@/client/utils/common.dto";

import s from "./index.scss";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: keyof Colors;
  label?: string;
  info?: React.ReactElement<any> | string;
}

export function Switch({ color = "primary", className, id, label, info, ...rest }: SwitchProps) {
  const classes = clsx(s.switch, s[color], className);

  return (
    <div className={s["form-group"]}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className={s["switch-container"]}>
        <input id={id} type="checkbox" {...rest} className={s.input} />
        <div className={classes} />
        {info && (
          <label htmlFor={id} className={s.info}>
            {info}
          </label>
        )}
      </div>
    </div>
  );
}
