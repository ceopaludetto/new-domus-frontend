import type { Theme } from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const darkVariant: Partial<Theme["palette"]> = {
  type: "dark",
  primary: {
    light: "#c3fdff",
    main: "#90caf9",
    dark: "#5d99c6",
    contrastText: "#000000",
  },
  error: {
    light: "#ff8e98",
    main: "#ff5a6a",
    dark: "#c61f40",
    contrastText: "#000000",
  },
  success: {
    light: "#f5ffec",
    main: "#c2eaba",
    dark: "#91b88a",
    contrastText: "#000000",
  },
  background: {
    default: "#1b1b1b",
    paper: "#252525",
  },
};

export const lightVariant: Partial<Theme["palette"]> = {
  type: "light",
  primary: {
    light: "#c3fdff",
    main: "#90caf9",
    dark: "#5d99c6",
    contrastText: "#000000",
  },
  error: {
    light: "#ff8e98",
    main: "#ff5a6a",
    dark: "#c61f40",
    contrastText: "#000000",
  },
  success: {
    light: "#f5ffec",
    main: "#c2eaba",
    dark: "#91b88a",
    contrastText: "#000000",
  },
  background: {
    default: "#1b1b1b",
    paper: "#252525",
  },
};

const common: Partial<Theme> = {
  shape: {
    borderRadius: 6,
  },
  props: {
    MuiTextField: {
      variant: "filled",
      fullWidth: true,
    },
    MuiButton: {
      disableElevation: true,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
      },
    },
    MuiFilledInput: {
      root: {
        overflow: "hidden",
        borderRadius: 6,
      },
      underline: {
        "&::before": {
          display: "none",
        },
      },
    },
    MuiPaper: {
      outlined: {
        backgroundColor: "transparent",
      },
    },
    MuiStepper: {
      root: {
        backgroundColor: "transparent",
        paddingLeft: "0",
        paddingRight: "0",
      },
    },
  },
};

export const theme = createMuiTheme({
  palette: darkVariant,
  ...common,
});
