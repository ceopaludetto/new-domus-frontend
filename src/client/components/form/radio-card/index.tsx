import * as React from "react";

import { Paper, Radio, RadioProps, Box, FormControlLabel } from "@material-ui/core";

interface RadioCardProps extends Omit<RadioProps, "type" | "onChange"> {
  label?: string;
  error?: boolean;
  helperText?: React.ReactNode | string;
}

export function RadioCard({ error, name, helperText, value, id, label, ...rest }: RadioCardProps) {
  return (
    <Box clone overflow="hidden">
      <Paper variant="outlined">
        <Box px={2} py={1} width="100%" justifyContent="flex-start">
          <FormControlLabel
            control={<Radio color="primary" id={id} value={value} {...rest} />}
            label={label}
            labelPlacement="end"
          />
        </Box>
      </Paper>
    </Box>
  );
}
