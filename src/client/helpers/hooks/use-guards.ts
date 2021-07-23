import { useCallback } from "react";

import { useMeQuery } from "@/client/graphql";
import { shouldAllowAccess } from "@/client/utils/guards";

export function useGuards() {
  const { data } = useMeQuery();

  const checkAccess = useCallback((rule?: boolean) => shouldAllowAccess(!!data?.profile, rule), [data?.profile]);

  return { checkAccess };
}
