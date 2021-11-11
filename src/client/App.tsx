import { Helmet } from "react-helmet-async";
import { renderRoutes } from "react-router-config";

import { Fonts } from "./components";
import { routes } from "./routes";

export function App() {
  return (
    <Fonts>
      <Helmet defaultTitle="Domus" titleTemplate="Domus | %s">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Helmet>
      {renderRoutes(routes)}
    </Fonts>
  );
}
