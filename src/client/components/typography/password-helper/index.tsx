import * as React from "react";

import clsx from "clsx";
import { OutlineCheckCircle } from "mdi-norm";

import u from "@/client/styles/utils.scss";

import { ColorText } from "../color-text";

interface PasswordHelperProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  active: boolean;
}

export function PasswordHelper({ children, active, ...rest }: PasswordHelperProps) {
  return (
    <ColorText
      bold
      small
      className={clsx(u.row, u["align-items-xs-center"], u["mb-3"])}
      color={active ? "primary" : "muted"}
      {...rest}
    >
      <div className={clsx(u.col, u["inline-flex"])}>
        <OutlineCheckCircle size={20} />
      </div>
      <div className={clsx(u.col, u.xs)}>{children}</div>
    </ColorText>
  );
}
