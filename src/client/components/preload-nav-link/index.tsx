import { forwardRef, useCallback, MouseEvent } from "react";
import { NavLink, NavLinkProps, useNavigate, useLocation } from "react-router-dom";

import { handleLinkClick } from "@/client/utils/route";

export interface PreloadNavLinkProps extends NavLinkProps {}

export const PreloadNavLink = forwardRef<HTMLAnchorElement, PreloadNavLinkProps>((props, ref) => {
  const { children, onClick, to, ...rest } = props;

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = useCallback(
    async (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      await handleLinkClick(navigate, location, to);

      if (onClick) onClick(e);
    },
    [to, onClick, location, navigate]
  );

  return (
    <NavLink ref={ref} to={to} onClick={handleClick} {...rest}>
      {children}
    </NavLink>
  );
});
