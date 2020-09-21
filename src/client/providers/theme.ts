import { Theme, createMuiTheme } from "@material-ui/core";

export const darkVariant: Partial<Theme["palette"]> = {
  type: "dark",
  primary: {
    light: "#c3fdff",
    main: "#90caf9",
    dark: "#5d99c6",
    contrastText: "#000000",
  },
  secondary: {
    light: "#ffffff",
    main: "#fafafa",
    dark: "#c7c7c7",
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
    light: "#63a4ff",
    main: "#1976d2",
    dark: "#5d99c6",
    contrastText: "#000000",
  },
  secondary: {
    light: "#404040",
    main: "#1a1a1a",
    dark: "#000000",
    contrastText: "#FFFFFF",
  },
  error: {
    light: "#ff838c",
    main: "#e1515f",
    dark: "#aa1835",
    contrastText: "#000000",
  },
  success: {
    light: "#8cdb78",
    main: "#5aa94a",
    dark: "#26791c",
    contrastText: "#000000",
  },
  background: {
    default: "#fff",
    paper: "#f2f2f2",
  },
};

export const common: Partial<Omit<Theme, "palette">> = {
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontFamily: "Roboto",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  } as Theme["typography"],
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
    MuiListItemIcon: {
      root: {
        minWidth: "36px",
      },
    },
    MuiTab: {
      root: {
        fontSize: "0.975rem",
        textTransform: "none",
      },
    },
  },
};

export const theme = createMuiTheme({
  palette: darkVariant,
  ...common,
});
