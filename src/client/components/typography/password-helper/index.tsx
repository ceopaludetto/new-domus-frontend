import * as React from "react";
import { FiCheckCircle } from "react-icons/fi";

import clsx from "clsx";

import u from "@/client/styles/utils.scss";

import { Text } from "../text";

interface PasswordHelperProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  active: boolean;
}

export function PasswordHelper({ children, active, ...rest }: PasswordHelperProps) {
  return (
    <Text
      as="span"
      variant="body-2"
      className={clsx(u.row, u["align-items-xs-center"], u["mb-xs-3"])}
      color={active ? "success" : "muted"}
      {...rest}
    >
      <div className={clsx(u.col, u["inline-flex"])}>
        <FiCheckCircle size={20} />
      </div>
      <div className={clsx(u.col, u.xs)}>{children}</div>
    </Text>
  );
}
