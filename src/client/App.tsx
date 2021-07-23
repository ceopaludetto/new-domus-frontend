import { Helmet } from "react-helmet-async";

import DayJSUtilsProvider from "@date-io/dayjs";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { LazyMotion } from "framer-motion";

import { Global, RouteHandler } from "@/client/components";
import { useFonts } from "@/client/helpers/hooks";
import { routes } from "@/client/providers/routes";
import { ThemeProvider } from "@/client/providers/theme";
import { getModule } from "@/client/utils/lazy";

interface AppProps {
  cookies: string;
}

const loadFeatures = () => import("@/client/utils/motion").then((res) => getModule(res));

export function App({ cookies }: AppProps) {
  useFonts();

  return (
    <LazyMotion features={loadFeatures} strict>
      <ThemeProvider cookies={cookies}>
        <MuiPickersUtilsProvider utils={DayJSUtilsProvider} locale="pt-BR">
          <Helmet htmlAttributes={{ lang: "pt-BR" }} defaultTitle="Domus" titleTemplate="%s | Domus">
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="Testing my all learned skills in web development" />
          </Helmet>
          <Global />
          <RouteHandler routes={routes} />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </LazyMotion>
  );
}
