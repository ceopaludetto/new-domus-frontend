import * as React from "react";

import loadable from "@loadable/component";

import type { Locale } from "@/client/utils/common.dto";
import { getModule } from "@/client/utils/lazy";

interface LocaleProviderProps {
  children: React.ReactNode | React.ReactNodeArray;
}

export const LocaleContext = React.createContext<{ locale: Locale | null }>({
  locale: null,
});

interface DayJSLocaleProps {
  locale: string;
}

const DayJSLocale = loadable.lib(
  (props: DayJSLocaleProps = { locale: "en" }) => import(`dayjs/locale/${props.locale}.js`)
);

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocale] = React.useState<(Locale & { default: Locale }) | null>();

  React.useEffect(() => {
    if (!locale) {
      DayJSLocale.load();
    }
  }, [locale]);

  return (
    <>
      <DayJSLocale locale="pt-br" ref={setLocale} />
      <LocaleContext.Provider value={{ locale: locale ? getModule(locale) : null }}>{children}</LocaleContext.Provider>
    </>
  );
}
