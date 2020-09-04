import * as React from "react";
import { NavLink } from "react-router-dom";

import clsx from "clsx";

import { PreloadLink, Text } from "@/client/components/typography";
import { useRipple } from "@/client/hooks";
import u from "@/client/styles/utils.scss";

import s from "./index.scss";

type TabsProps = React.HTMLAttributes<HTMLDivElement>;

export function Tabs({ children }: TabsProps) {
  return <div className={clsx(u.row, u["align-items-xs-center"], s.tabs)}>{children}</div>;
}

type TabProps = React.ComponentProps<typeof PreloadLink>;

const Tab = ({ children, ...rest }: TabProps) => {
  const ref = React.useRef<HTMLAnchorElement>(null);
  useRipple(ref);

  return (
    <PreloadLink
      className={clsx(u["py-xs-4"], u["px-xs-6"], u.relative, s.item)}
      activeClassName={s.active}
      ref={ref}
      as={NavLink}
      {...rest}
    >
      <Text variant="button" as="span" noMargin>
        {children}
      </Text>
    </PreloadLink>
  );
};

Tabs.Tab = Tab;
