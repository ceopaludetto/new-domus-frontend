import { useMemo } from "react";

export function usePasswordHelp(password: string) {
  return useMemo(
    () => ({
      oneNumber: /\d/.test(password),
      oneUpper: /[A-Z]/.test(password),
      min: password.length >= 6,
    }),
    [password]
  );
}
