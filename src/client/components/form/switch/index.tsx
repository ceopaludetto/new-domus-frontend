import * as React from "react";

import clsx from "clsx";

import { Text } from "@/client/components/typography";
import u from "@/client/styles/utils.module.scss";
import type { Colors } from "@/client/utils/common.dto";

import s from "./index.module.scss";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: keyof Colors;
  label?: string;
  info?: React.ReactElement<any> | string;
}

export function Switch({ color = "primary", className, id, label, info, ...rest }: SwitchProps) {
  const classes = clsx(s.switch, s[color], className);

  return (
    <div className={s["form-group"]}>
      {label && (
        <div className={u["mb-xs-3"]}>
          <Text as="label" htmlFor={id}>
            {label}
          </Text>
        </div>
      )}
      <div className={s["switch-container"]}>
        <input id={id} type="checkbox" {...rest} className={s.input} />
        <div className={classes} />
        {info && (
          <Text as="label" htmlFor={id} className={s.info}>
            {info}
          </Text>
        )}
      </div>
    </div>
  );
}
