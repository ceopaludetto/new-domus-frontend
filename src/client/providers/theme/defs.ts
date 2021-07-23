import type { Theme } from "@material-ui/core";

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

export const blueVariant: Partial<Theme["palette"]> = {
  ...darkVariant,
  background: {
    default: "#111827",
    paper: "#1F2937",
  },
};

export const lightVariant: Partial<Theme["palette"]> = {
  type: "light",
  primary: {
    light: "#63a4ff",
    main: "#1976d2",
    dark: "#5d99c6",
    contrastText: "#FFFFFF",
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
    default: "#f2f2f2",
    paper: "#fff",
  },
};

export const overrides = (variant: Partial<Theme["palette"]>) => ({
  MuiButton: {
    root: {
      textTransform: "none",
    },
  },
  MuiPaper: {
    outlined: {
      backgroundColor: variant.background?.paper,
    },
  },
  MuiStepper: {
    root: {
      backgroundColor: "transparent",
      paddingLeft: "0",
      paddingRight: "0",
    },
  },
  MuiTab: {
    root: {
      fontSize: "0.975rem",
      textTransform: "none",
    },
  },
  MuiFilledInput: {
    root: {
      borderRadius: "6px!important",
      overflow: "hidden",
    },
    underline: {
      "&::before": {
        display: "none!important",
      },
    },
  },
  MuiIconButton: {
    root: {
      padding: "10px",
    },
  },
  MuiTypography: {
    overline: {
      fontWeight: 500,
      letterSpacing: "0.05rem",
    },
  },
  MuiPickersCalendarHeader: {
    switchHeader: {
      padding: "0 0.5rem",
    },
  },
});

export const props: Theme["props"] = {
  MuiFormControl: {
    variant: "filled",
  },
  MuiFormHelperText: {
    variant: "filled",
  },
  MuiSelect: {
    variant: "filled",
  },
  MuiInputLabel: {
    variant: "filled",
  },
  MuiTextField: {
    variant: "filled",
    fullWidth: true,
  },
  MuiButton: {
    disableElevation: true,
  },
  MuiIconButton: {
    color: "secondary",
  },
};
