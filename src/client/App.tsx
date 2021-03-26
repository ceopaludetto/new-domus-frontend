import { Helmet } from "react-helmet-async";

import DayJSUtilsProvider from "@date-io/dayjs";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import { ProgressBar, Global, RouteHandler } from "@/client/components";
import { useFonts } from "@/client/hooks";
import { routes } from "@/client/providers/routes";
import { ThemeProvider } from "@/client/providers/theme";

interface AppProps {
  cookies: string;
  logged?: boolean;
}

export function App({ cookies, logged }: AppProps) {
  useFonts();

  return (
    <ThemeProvider cookies={cookies}>
      <MuiPickersUtilsProvider utils={DayJSUtilsProvider} locale="pt-BR">
        <Helmet htmlAttributes={{ lang: "pt-BR" }} defaultTitle="Domus" titleTemplate="%s | Domus">
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="Testing my all learned skills in web development" />
        </Helmet>
        <ProgressBar />
        <Global />
        <RouteHandler routes={routes} initialLogged={logged} notFound={() => <div>not found</div>} />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}
