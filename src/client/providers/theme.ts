import { toRem } from "@/client/styles/helpers/toRem";
import { Theme } from "@/client/utils/common.dto";

import { Dark } from "./colors";

export const theme: Theme = {
  palette: Dark,
  shape: toRem(6, 16) as string,
  typography: {
    default: "16px",
    sizes: toRem([14, 16, 20, 24, 32], "16px") as string[],
    weights: {
      light: 300,
      regular: 400,
      medium: 600
    },
    family: {
      base: ["'Open Sans'", "sans-serif"]
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
