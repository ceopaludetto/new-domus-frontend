import { useCallback } from "react";

import { useLoggedQuery } from "@/client/graphql/index.graphql";
import { shouldAllowAccess } from "@/client/utils/guards";

export function usePermissionGuards() {
  const { data: logged } = useLoggedQuery();

  const checkAccess = useCallback(
    (need: boolean, initialLogged?: boolean) => shouldAllowAccess(!!(logged?.logged ?? initialLogged), need),
    [logged]
  );

  return { checkAccess };
}
