import * as React from "react";
import { Link } from "react-router-dom";

import { usePreload, usePathWithCondominium } from "@/client/hooks";

const hasPathname = (to: { pathname: string } | string): to is { pathname: string } => typeof to !== "string";

type PreloadLinkProps<T extends React.ElementType<any> = Link> = {
  as?: T;
  to: { pathname: string } | string;
  params?: Record<string, any>;
} & React.ComponentProps<T>;

export const PreloadLink = React.forwardRef(
  <T extends React.ComponentType<any> = Link>(
    { to, params, children, onClick, as: Component = Link, ...rest }: PreloadLinkProps<T>,
    ref: React.Ref<any>
  ) => {
    const [generatePath] = usePathWithCondominium();
    const routePath = hasPathname(to) ? to.pathname : to;
    const path = params || routePath.includes(":condominium") ? generatePath(routePath, params) : routePath;
    const [handleClick] = usePreload<T>(onClick);

    return (
      <Component ref={ref} to={path} onClick={handleClick(path)} {...rest}>
        {children}
      </Component>
    );
  }
);
