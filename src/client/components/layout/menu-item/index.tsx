import * as React from "react";

import clsx from "clsx";

import { useRipple } from "@/client/hooks";
import { merge } from "@/client/utils/merge.refs";

import s from "./index.scss";

interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active: boolean;
}

export const MenuItem = React.forwardRef(
  ({ active, children, ...props }: MenuItemProps, ref: React.Ref<HTMLDivElement>) => {
    const innerRef = React.useRef<HTMLDivElement>(null);
    useRipple(innerRef, { noTouch: true });

    return (
      <div ref={merge([innerRef, ref])} className={clsx(s.item, active && s.active)} {...props}>
        {children}
      </div>
    );
  }
);
