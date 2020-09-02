import * as React from "react";
import { NavLink } from "react-router-dom";

import clsx from "clsx";

import { PreloadLink, Text } from "@/client/components/typography";
import { useRipple } from "@/client/hooks";
import u from "@/client/styles/utils.scss";

import s from "./index.scss";

interface SidebarItem extends React.ComponentProps<typeof PreloadLink> {
  icon: React.ReactNode;
}

export function SidebarItem({ children, to, icon, ...rest }: SidebarItem) {
  const ref = React.useRef<HTMLAnchorElement>(null);
  useRipple(ref);

  return (
    <PreloadLink
      as={NavLink}
      className={clsx(s.item, u.relative, u.flex, u["p-xs-5"], u["align-items-xs-center"])}
      activeClassName={s.active}
      ref={ref}
      to={to}
      exact
      {...rest}
    >
      {icon}
      <Text variant="button" noMargin>
        {children}
      </Text>
    </PreloadLink>
  );
}
