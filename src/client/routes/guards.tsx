import type { ReactElement } from "react";
import { generatePath, Navigate } from "react-router-dom";

import { useProfileQuery } from "../graphql";
import { useSelectedCondominium } from "../utils/hooks";

interface RequireAuthProps {
  children: ReactElement<any>;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const { data } = useProfileQuery();

  if (!data) return <Navigate to="/authentication/signin" replace />;
  return children;
}

export function DontRequireAuth({ children }: RequireAuthProps) {
  const [selectedCondominium] = useSelectedCondominium();
  const { data } = useProfileQuery();

  if (data) {
    const path = generatePath("/application/:condominium", { condominium: selectedCondominium?.id });
    return <Navigate to={path} replace />;
  }

  return children;
}
