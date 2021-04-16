import "@material-ui/core";

declare module "@material-ui/core" {
  interface BoxProps {
    ref?: import("react").Ref<HTMLElement>;
  }
}
