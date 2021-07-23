import { FiCheck } from "react-icons/fi";

import { ButtonBase, Box, makeStyles, fade, Theme } from "@material-ui/core";
import clsx from "clsx";

import { useColorMode } from "@/client/helpers/hooks";
import { variants } from "@/client/providers/theme";
import type { ColorMode } from "@/client/utils/types";

import { Spacer } from "../spacer";
import { Tooltip } from "../tooltip";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: theme.shape.borderRadius,
    border: `2px solid ${fade(theme.palette.getContrastText(theme.palette.background.default), 0.5)}`,
    minHeight: 40,
    minWidth: 40,
    transition: theme.transitions.create(["border-color"], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
    "& svg": {
      strokeDasharray: 25,
      strokeDashoffset: 25,
      transition: theme.transitions.create(["stroke-dashoffset"], {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeInOut,
      }),
    },
    "&$selected": {
      borderColor: `${theme.palette.primary.main}!important`,
      "& svg": {
        strokeDashoffset: 0,
      },
    },
  },
  selected: {},
}));

export function ThemeSelector() {
  const classes = useStyles();
  const { theme, colorMode, changeColorMode } = useColorMode();

  return (
    <Box mt={2}>
      <Spacer>
        {Object.entries(variants).map(([key, { name, color }]) => (
          <Tooltip key={key} title={name}>
            <ButtonBase
              style={{ backgroundColor: color, color: theme.palette.getContrastText(color) }}
              className={clsx(classes.root, colorMode === key && classes.selected)}
              onClick={() => changeColorMode(key as ColorMode)}
            >
              <FiCheck size={24} />
            </ButtonBase>
          </Tooltip>
        ))}
      </Spacer>
    </Box>
  );
}
