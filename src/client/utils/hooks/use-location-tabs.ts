import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useLocationTabs() {
  const location = useLocation();
  const [page, setPage] = useState(() => location.pathname.split("?")[0]);

  const changePage = useCallback((e: ChangeEvent<unknown>, value: any) => {
    setPage(value);
  }, []);

  useEffect(() => {
    const [path] = location.pathname.split("?");

    if (path !== page) {
      setPage(path);
    }
  }, [location.pathname, page]);

  return [page, changePage] as const;
}
