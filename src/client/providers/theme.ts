import { toRem } from "@/client/styles/helpers/toRem";
import { Theme } from "@/client/utils/common.dto";

import { Dark } from "./colors";

export const theme: Theme = {
  palette: Dark,
  shape: toRem(6, 16) as string,
  typography: {
    default: "16px",
    sizes: toRem([14, 16, 20, 24, 32], 16) as string[],
    weights: {
      light: 300,
      regular: 400,
      medium: 600
    },
    family: {
      base: ["'Open Sans'", "sans-serif"]
    }
  },
  layout: {
    sizes: toRem([0, 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64], 16) as string[],
    breakpoints: {
      xs: toRem(0, 16) as string,
      sm: toRem(576, 16) as string,
      md: toRem(768, 16) as string,
      lg: toRem(992, 16) as string,
      xl: toRem(1200, 16) as string,
      get(v) {
        return this[v];
      }
    },
    container: {
      xs: toRem(0, 16) as string,
      sm: toRem(540, 16) as string,
      md: toRem(720, 16) as string,
      lg: toRem(960, 16) as string,
      xl: toRem(1140, 16) as string
    }
  },
  transitions: {
    ease: {
      easeIn: "ease-in",
      easeInOut: "ease-in-out"
    },
    durations: {
      short: "125ms",
      long: "250ms"
    },
    create(props, ease = "easeInOut", durations = "short") {
      let trans = "";
      props.forEach((p, i) => {
        trans += `${i !== 0 ? "," : ""}${p} ${this.ease[ease]} ${this.durations[durations]}`;
      });
      return trans;
    }
  }
};
