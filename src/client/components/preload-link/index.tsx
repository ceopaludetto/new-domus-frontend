import { useCallback, MouseEvent, forwardRef } from "react";
import { Link, LinkProps, useNavigate, useLocation } from "react-router-dom";

import { handleLinkClick } from "@/client/utils/route";

export interface PreloadLinkProps extends LinkProps {}

export const PreloadLink = forwardRef<HTMLAnchorElement, PreloadLinkProps>((props, ref) => {
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
    <Link ref={ref} to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
});
