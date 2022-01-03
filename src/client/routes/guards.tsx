import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";

import { useProfileQuery } from "../graphql";

interface RequireAuthProps {
  children: ReactElement<any>;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const { data } = useProfileQuery();

  if (!data) return <Navigate to="/authentication/signin" replace />;
  return children;
}

export function DontRequireAuth({ children }: RequireAuthProps) {
  const { data } = useProfileQuery();

  if (data) return <Navigate to="/application" replace />;
  return children;
}
