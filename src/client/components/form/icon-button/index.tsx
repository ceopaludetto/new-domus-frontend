import * as React from "react";

import clsx from "clsx";

import { Tooltip, ConditionalWrap } from "@/client/components/layout";
import { useRipple } from "@/client/hooks";
import type { Colors } from "@/client/utils/common.dto";
import { merge } from "@/client/utils/merge.refs";

import s from "./index.scss";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement<{ size?: number }>;
  size?: "small" | "normal";
  color?: keyof Colors;
  tooltip?: Omit<React.ComponentProps<typeof Tooltip>, "children">;
}

export const IconButton = React.forwardRef(
  (
    { color = "primary", size = "normal", type = "button", children, className, tooltip, ...rest }: IconButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const innerRef = React.useRef<HTMLButtonElement>(null);
    const classes = clsx(s.button, s[color], s[size], className);
    useRipple(innerRef, { center: true });

    return (
      <ConditionalWrap condition={!!tooltip} wrap={(c) => (tooltip ? <Tooltip {...tooltip}>{c}</Tooltip> : <></>)}>
        <button ref={merge([innerRef, ref])} type={type} className={classes} {...rest}>
          {React.cloneElement(children, {
            size: size === "small" ? 20 : 24,
          })}
        </button>
      </ConditionalWrap>
    );
  }
);
