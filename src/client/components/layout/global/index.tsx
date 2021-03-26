import { Helmet } from "react-helmet-async";

import { Theme, CssBaseline } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

import Poppins300 from "@/client/assets/fonts/poppins-300.woff2";
import Poppins400 from "@/client/assets/fonts/poppins-400.woff2";
import Poppins500 from "@/client/assets/fonts/poppins-500.woff2";
import Poppins600 from "@/client/assets/fonts/poppins-600.woff2";

function GlobalComponent() {
  return (
    <>
      <Helmet>
        <link rel="preload" href={Poppins300} as="font" crossOrigin="anonymous" />
        <link rel="preload" href={Poppins400} as="font" crossOrigin="anonymous" />
        <link rel="preload" href={Poppins500} as="font" crossOrigin="anonymous" />
        <link rel="preload" href={Poppins600} as="font" crossOrigin="anonymous" />
      </Helmet>
      <CssBaseline />
    </>
  );
}

export const Global = withStyles((theme: Theme) => ({
  "@global": {
    "*::selection": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    body: {
      overflowX: "hidden",
    },
  },
}))(GlobalComponent);
