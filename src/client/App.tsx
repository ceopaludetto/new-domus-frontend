import { Helmet } from "react-helmet-async";
import { useRoutes } from "react-router-dom";

import { Fonts } from "./components";
import { routes } from "./routes";
import "./utils/polyfills";

export function App() {
  const element = useRoutes(routes);

  return (
    <Fonts>
      <Helmet defaultTitle="Domus" titleTemplate="Domus | %s">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Helmet>
      {element}
    </Fonts>
  );
}
