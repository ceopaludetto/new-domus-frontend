import React from "react";

import clsx from "clsx";

import { Colors } from "@/client/utils/common.dto";

import s from "./index.scss";

export interface ControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  color?: keyof Colors;
  margin?: boolean;
}

export function Control({ id, label, color = "primary", placeholder = " ", margin = true, ...rest }: ControlProps) {
  return (
    <div className={clsx({ [s["form-group"]]: margin })}>
      <div className={clsx(s.container, s[color])}>
        <input className={s.input} id={id} placeholder={placeholder} {...rest} />
        <label className={s.label} htmlFor={id}>
          {label}
        </label>
        <div className={clsx(s.effect, s[color])} />
      </div>
    </div>
  );
}
