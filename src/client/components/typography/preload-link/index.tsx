import * as React from "react";
import { Link, LinkProps } from "react-router-dom";

import { usePreload } from "@/client/hooks";

const hasPathname = (to: { pathname: string } | string): to is { pathname: string } => typeof to !== "string";

type PreloadLinkProps = Omit<LinkProps, "to"> & {
  to: { pathname: string } | string;
  nested?: boolean;
};

export function PreloadLink({ to, children, onClick, nested = false, ...rest }: PreloadLinkProps) {
  const path = hasPathname(to) ? to.pathname : to;
  const handleClick = usePreload(path, nested, onClick);

  return (
    <Link to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
