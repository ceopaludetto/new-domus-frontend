import * as React from "react";
import { useFormContext, get } from "react-hook-form";

import { FormControl, FormControlLabel, FormLabel, FormHelperText, Switch, SwitchProps, Box } from "@material-ui/core";

type FormSwitchProps = Omit<SwitchProps, "name" | "onChange" | "value"> & {
  name: string;
  helperText?: React.ReactNode;
  label: string;
  info: string;
};

export function FormSwitch({ name, label, id, info, helperText, ...rest }: FormSwitchProps) {
  const { register, errors } = useFormContext();
  const error = get(errors, name);

  return (
    <FormControl error={!!error} component="fieldset" fullWidth variant="filled">
      <Box mb={0.5}>
        <FormLabel error={!!error} component="legend" id={`${id}-label`}>
          {label}
        </FormLabel>
      </Box>
      <FormControlLabel
        label={info}
        labelPlacement="end"
        control={<Switch name={name} inputRef={register} color="primary" id={id} {...rest} />}
      />
      {(error?.message ?? helperText) && (
        <FormHelperText variant="filled" error={!!error}>
          {error?.message ?? helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
