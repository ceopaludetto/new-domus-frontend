import * as React from "react";
import { Helmet } from "react-helmet-async";

import { withStyles } from "@material-ui/styles";

import Roboto300 from "@/client/assets/fonts/roboto-300.woff2";
import Roboto400 from "@/client/assets/fonts/roboto-400.woff2";
import Roboto500 from "@/client/assets/fonts/roboto-500.woff2";
import Roboto700 from "@/client/assets/fonts/roboto-700.woff2";

function GlobalComponent() {
  return (
    <>
      <Helmet>
        <link rel="preload" href={Roboto300} as="font" crossOrigin="anonymous" />
        <link rel="preload" href={Roboto400} as="font" crossOrigin="anonymous" />
        <link rel="preload" href={Roboto500} as="font" crossOrigin="anonymous" />
        <link rel="preload" href={Roboto700} as="font" crossOrigin="anonymous" />
      </Helmet>
    </>
  );
}

export const Global = withStyles({
  "@global": {
    "@font-face": [
      {
        fontDisplay: "swap",
        fontFamily: "Roboto",
        fontWeight: 300,
        fontStyle: "normal",
        src: `local("Roboto Light"), local("Roboto-Light"), url(${Roboto300}) format("woff2")`,
      },
      {
        fontDisplay: "swap",
        fontFamily: "Roboto",
        fontWeight: 400,
        fontStyle: "normal",
        src: `local("Roboto Regular"), local("Roboto-Regular"), url(${Roboto400}) format("woff2")`,
      },
      {
        fontDisplay: "swap",
        fontFamily: "Roboto",
        fontWeight: 500,
        fontStyle: "normal",
        src: `local("Roboto Medium"), local("Roboto-Medium"), url(${Roboto500}) format("woff2")`,
      },
      {
        fontDisplay: "swap",
        fontFamily: "Roboto",
        fontWeight: 700,
        fontStyle: "normal",
        src: `local("Roboto Bold"), local("Roboto-Bold"), url(${Roboto700}) format("woff2")`,
      },
    ],
  },
})(GlobalComponent);
