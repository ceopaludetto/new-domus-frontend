export function shouldRenderByAuth(needAuth?: boolean, isAuthenticated = false) {
  if (needAuth === undefined) {
    return true;
  }

  return isAuthenticated === needAuth;
}
