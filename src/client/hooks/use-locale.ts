import * as React from "react";

import { LocaleContext } from "@/client/providers/locale";

export function useLocale() {
  const { locale } = React.useContext(LocaleContext);

  return locale?.name ?? "en";
}
