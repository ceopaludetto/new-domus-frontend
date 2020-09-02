export function shouldRenderByAuth(needAuth?: boolean, isAuthenticated = false) {
  if (typeof needAuth === "undefined") {
    return true;
  }

  return isAuthenticated === needAuth;
}
