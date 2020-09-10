import * as React from "react";
import { Link } from "react-router-dom";

import { usePreload, usePathWithCondominium } from "@/client/hooks";

const hasPathname = (to: { pathname: string } | string): to is { pathname: string } => typeof to !== "string";

interface PreloadLinkProps extends React.ComponentProps<typeof Link> {
  to: { pathname: string } | string;
  params?: Record<string, any>;
}

export const PreloadLink = React.forwardRef(
  ({ to, params, children, onClick, ...rest }: PreloadLinkProps, ref: React.Ref<HTMLAnchorElement>) => {
    const [generatePath] = usePathWithCondominium();
    const routePath = hasPathname(to) ? to.pathname : to;
    const path = params || routePath.includes(":condominium") ? generatePath(routePath, params) : routePath;
    const [handleClick] = usePreload(onClick);

    return (
      <Link ref={ref} to={path} onClick={handleClick(path)} {...rest}>
        {children}
      </Link>
    );
  }
);
