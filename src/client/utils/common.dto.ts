export type Colors = {
  primary: string;
  secondary: string;
  background: string;
  paper: string;
  muted: string;
};

export type GeneratedColors = {
  [key in keyof Colors]: {
    main: string;
    darken: string[];
    lighten: string[];
    shadows: string[];
    contrast: string;
  };
};

export interface Easing {
  easeIn: string;
  easeInOut: string;
}

export interface Durations {
  short: string;
  long: string;
}

export interface Breakpoints<T> {
  xs: T;
  sm: T;
  md: T;
  lg: T;
  xl: T;
}

export interface Theme {
  shape: string;
  palette: GeneratedColors;
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
  layout: {
    sizes: string[];
    breakpoints: Breakpoints<string> & { get(v: keyof Breakpoints<string>): string };
    container: Breakpoints<string>;
  };
  transitions: {
    ease: Easing;
    durations: Durations;
    create(props: string[], ease?: keyof Easing, durations?: keyof Durations): string;
  };
}
