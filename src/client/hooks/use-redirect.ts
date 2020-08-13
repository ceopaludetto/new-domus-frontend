import { useLocation, useHistory } from "react-router-dom";
import { useEffectOnce } from "react-use";

import type { ReactStaticContext } from "@/client/utils/common.dto";

interface RedirectOptions {
  status?: number;
  staticContext?: ReactStaticContext;
}

export function useRedirect(url: string, { status = 301, staticContext = {} }: RedirectOptions) {
  const location = useLocation();
  const history = useHistory();

  useEffectOnce(() => {
    if (location.pathname !== url && typeof window !== "undefined") {
      history.replace(url);
    }
  });

  if (location.pathname !== url && typeof window === "undefined" && typeof staticContext === "object") {
    if (status) {
      staticContext.statusCode = status;
    }
    staticContext.url = url;
  }
}
