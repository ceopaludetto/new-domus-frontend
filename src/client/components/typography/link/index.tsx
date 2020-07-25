import * as React from "react";

import clsx from "clsx";

import { Colors } from "@/client/utils/common.dto";

import { ColorText } from "../color-text";
import s from "./index.scss";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  color?: keyof Colors;
  button?: boolean;
}

export function Link({ children, className, button = false, href = "#", ...rest }: LinkProps) {
  const classes = clsx(s.link, button && s.button, className);

  return (
    <ColorText as="a" href={href} className={classes} {...rest}>
      {children}
    </ColorText>
  );
}
