import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

import { usePreload } from "@/client/helpers/hooks";
import { usePathWithCondominium } from "@/client/helpers/hooks/use-path-with-condominium";

interface PreloadNavLinkProps extends React.ComponentPropsWithoutRef<typeof NavLink> {
  to: { pathname: string } | string;
}

export const PreloadNavLink = forwardRef<HTMLAnchorElement, PreloadNavLinkProps>(({ to, onClick, ...rest }, ref) => {
  const { preloadClick } = usePreload(onClick);
  const generate = usePathWithCondominium();
  const path = generate(to);

  return <NavLink ref={ref} to={path} onClick={preloadClick(path)} {...rest} />;
});
