import { forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";

import { usePreload, usePathWithCondominium } from "@/client/hooks";
import { hasPathname } from "@/client/utils/string";

interface PreloadLinkProps extends LinkProps {
  to: { pathname: string } | string;
  params?: Record<string, any>;
}

export const PreloadLink = forwardRef<HTMLAnchorElement, PreloadLinkProps>(
  ({ to, params, children, onClick, ...rest }, ref) => {
    const { handlePreloadClick } = usePreload(onClick);
    const [generatePath] = usePathWithCondominium();

    const resolvedTo = hasPathname(to) ? to.pathname : to;
    const path = generatePath(resolvedTo);

    return (
      <Link ref={ref} to={path} onClick={handlePreloadClick(path)} {...rest}>
        {children}
      </Link>
    );
  }
);
