import * as React from "react";

import clsx from "clsx";

import { Colors } from "@/client/utils/common.dto";

import { ColorText } from "../color-text";
import s from "./index.scss";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  color?: keyof Colors;
}

export function Link({ children, className, href = "#", ...rest }: LinkProps) {
  const classes = clsx(s.link, className);

  return (
    <ColorText as="a" href={href} className={classes} {...rest}>
      {children}
    </ColorText>
  );
}
