import { useLocation, useHistory } from "react-router-dom";
import { useEffectOnce } from "react-use";

import { ReactStaticContext } from "@/client/utils/common.dto";

interface RedirectOptions {
  url: string;
  location: ReturnType<typeof useLocation>;
  history: ReturnType<typeof useHistory>;
  staticContext?: ReactStaticContext;
}

export function useRedirect({ url, location, history, staticContext }: RedirectOptions, status?: number) {
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
