import { toRem } from "@/client/styles/helpers/toRem";

export interface Theme {
  palette: {
    current: "dark" | "light";
    light: {
      [K: string]: string;
    };
    dark: {
      [K: string]: string;
    };
  };
  typography: {
    default: string;
    sizes: string[];
    weights: {
      light: number;
      regular: number;
      medium: number;
    };
    family: {
      base: string[];
    };
  };
}

export const theme: Theme = {
  palette: {
    current: "dark",
    light: {
      primary: "#80cfa9"
    },
    dark: {
      primary: "#80cfa9"
    }
  },
  typography: {
    default: "16px",
    sizes: toRem([14, 16, 20, 24, 32], "16px") as string[],
    weights: {
      light: 300,
      regular: 400,
      medium: 700
    },
    family: {
      base: ["Roboto", "sans-serif"]
    }
  }
};
