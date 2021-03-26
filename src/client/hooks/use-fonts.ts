import { makeStyles } from "@material-ui/styles";

import Poppins300 from "@/client/assets/fonts/poppins-300.woff2";
import Poppins400 from "@/client/assets/fonts/poppins-400.woff2";
import Poppins500 from "@/client/assets/fonts/poppins-500.woff2";
import Poppins600 from "@/client/assets/fonts/poppins-600.woff2";

export const useFonts = makeStyles(() => ({
  "@font-face": [
    {
      fontDisplay: "swap",
      fontFamily: "Poppins",
      fontWeight: 300,
      fontStyle: "normal",
      src: `local("Poppins Light"), local("Poppins-Light"), url(${Poppins300}) format("woff2")`,
    },
    {
      fontDisplay: "swap",
      fontFamily: "Poppins",
      fontWeight: 400,
      fontStyle: "normal",
      src: `local("Poppins Regular"), local("Poppins-Regular"), url(${Poppins400}) format("woff2")`,
    },
    {
      fontDisplay: "swap",
      fontFamily: "Poppins",
      fontWeight: 500,
      fontStyle: "normal",
      src: `local("Poppins Medium"), local("Poppins-Medium"), url(${Poppins500}) format("woff2")`,
    },
    {
      fontDisplay: "swap",
      fontFamily: "Poppins",
      fontWeight: 600,
      fontStyle: "normal",
      src: `local("Poppins Bold"), local("Poppins-Bold"), url(${Poppins600}) format("woff2")`,
    },
  ] as any,
}));
