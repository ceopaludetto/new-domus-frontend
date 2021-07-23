import { Theme, fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  current: {
    ...theme.typography.button,
    textTransform: "capitalize",
    color: theme.palette.secondary.contrastText,
  },
  link: {
    ...theme.typography.button,
    textTransform: "capitalize",
    color: fade(theme.palette.secondary.contrastText, 0.8),
    "&:hover": {
      color: theme.palette.primary[theme.palette.type],
    },
  },
  root: {
    padding: theme.spacing(0.75, 2),
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
  },
}));
