import { forwardRef } from "react";
import { Link } from "react-router-dom";

import { usePreload } from "@/client/helpers/hooks";
import { usePathWithCondominium } from "@/client/helpers/hooks/use-path-with-condominium";

interface PreloadLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  to: { pathname: string } | string;
}

export const PreloadLink = forwardRef<HTMLAnchorElement, PreloadLinkProps>(({ to, onClick, ...rest }, ref) => {
  const { preloadClick } = usePreload(onClick);
  const generate = usePathWithCondominium();
  const path = generate(to);

  return <Link ref={ref} to={path} onClick={preloadClick(path)} {...rest} />;
});
