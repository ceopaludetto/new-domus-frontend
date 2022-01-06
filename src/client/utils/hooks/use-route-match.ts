import { matchPath, useLocation } from "react-router-dom";

export function useRouteMatch(patterns: string[]) {
  const location = useLocation();

  for (const pattern of patterns) {
    const possibleMatch = matchPath(pattern, location.pathname);
    if (possibleMatch) return possibleMatch;
  }

  return null;
}
