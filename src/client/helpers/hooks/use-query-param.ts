import { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import qs from "qs";

export function useQueryParam(name: string) {
  const location = useLocation();
  const history = useHistory();

  const [param, setParam] = useState<string | undefined>(() => {
    const parsed = qs.parse(location.search.replace("?", ""));

    if (parsed[name]) return parsed[name] as string;
    return undefined;
  });

  useEffect(() => {
    const parsed = qs.parse(location.search.replace("?", ""));

    if (parsed[name]) {
      setParam(parsed[name] as string);
    }
  }, [location.search, name]);

  const changeParam = useCallback(
    (value: string) => {
      const parsed = qs.parse(location.search.replace("?", ""));
      const params = { ...parsed, [name]: value };

      if (!value) {
        delete params[name];
      }

      const query = qs.stringify(params);
      const path = `${location.pathname}?${query}`;

      history.replace(path);
    },
    [location, history, name]
  );

  return [param, changeParam] as const;
}
