import * as React from "react";
import { createPortal } from "react-dom";
import { usePopper, PopperProps } from "react-popper";
import { useLocation } from "react-router-dom";
import { useIsomorphicLayoutEffect } from "react-use";

import clsx from "clsx";

import { Text } from "@/client/components/typography";
import u from "@/client/styles/utils.scss";
import type { Colors } from "@/client/utils/common.dto";

import { NoSsr } from "../no-ssr";
import s from "./index.scss";

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement<{ ref: React.Dispatch<React.SetStateAction<HTMLElement | null>>; className: string }>;
  content: string;
  forceUpdate?: any;
  updateOnLocationChange?: boolean;
  updateOnContentChange?: boolean;
  placement?: PopperProps<any>["placement"];
  color?: keyof Colors;
}

const modifiers = [
  {
    name: "offset",
    options: {
      offset: [0, 6],
    },
  },
  {
    name: "preventOverflow",
    options: {
      padding: 10,
    },
  },
  {
    name: "flip",
    options: {
      fallbackPlacements: ["top"],
    },
  },
];

export function Tooltip({
  children,
  content,
  color = "text",
  placement = "bottom",
  className,
  forceUpdate,
  updateOnLocationChange = true,
  updateOnContentChange = true,
  ...rest
}: TooltipProps) {
  const [tooltip, setTooltip] = React.useState<HTMLDivElement | null>(null);
  const [el, setEl] = React.useState<HTMLDivElement | null>(null);
  const { styles, attributes, update } = usePopper(el, tooltip, {
    placement,
    modifiers,
  });
  const [visible, setVisible] = React.useState(false);
  const location = useLocation();
  const classes = clsx(s.tooltip, s[color], u["px-xs-3"], u["py-xs-2"], visible && s.visible, className);

  React.useEffect(() => {
    if (update) update();
  }, [forceUpdate, update]);

  useIsomorphicLayoutEffect(() => {
    if (update && updateOnLocationChange) {
      update();
    }
  }, [location.pathname, updateOnLocationChange, update]);

  useIsomorphicLayoutEffect(() => {
    if (update && updateOnContentChange) {
      update();
    }
  }, [content, updateOnContentChange, update]);

  return (
    <>
      <div ref={setEl} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
        {children}
        <NoSsr>
          {typeof window !== "undefined" &&
            createPortal(
              <div className={classes} ref={setTooltip} style={styles.popper} {...attributes.popper} {...rest}>
                <Text as="span" variant="body-2" noMargin>
                  {content}
                </Text>
              </div>,
              document?.querySelector("body") as HTMLBodyElement
            )}
        </NoSsr>
      </div>
    </>
  );
}
