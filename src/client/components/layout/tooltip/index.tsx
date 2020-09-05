import * as React from "react";
import { usePopper, PopperProps } from "react-popper";

import clsx from "clsx";

import { Text } from "@/client/components/typography";
import u from "@/client/styles/utils.scss";
import type { Colors } from "@/client/utils/common.dto";

import s from "./index.scss";

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement<{ ref: React.Dispatch<React.SetStateAction<HTMLElement | null>>; className: string }>;
  content: string;
  forceUpdate?: any;
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
];

export function Tooltip({
  children,
  content,
  color = "text",
  placement = "bottom",
  className,
  forceUpdate,
  ...rest
}: TooltipProps) {
  const [tooltip, setTooltip] = React.useState<HTMLDivElement | null>(null);
  const [el, setEl] = React.useState<HTMLDivElement | null>(null);
  const { styles, attributes, update } = usePopper(el, tooltip, {
    placement,
    modifiers,
  });

  React.useEffect(() => {
    if (update) update();
  }, [forceUpdate, update]);

  const classes = clsx(s.tooltip, s[color], u["px-xs-3"], u["py-xs-2"], className);

  return (
    <>
      <div ref={setEl} className={s.reference}>
        {children}
        <div className={classes} ref={setTooltip} style={styles.popper} {...attributes.popper} {...rest}>
          <Text as="span" variant="body-2" noMargin>
            {content}
          </Text>
        </div>
      </div>
    </>
  );
}
