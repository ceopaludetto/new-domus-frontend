import * as React from "react";
import { useFormContext, get, Controller } from "react-hook-form";

import { FormControl, FormControlLabel, FormLabel, FormHelperText, Switch, SwitchProps } from "@material-ui/core";

type FormSwitchProps = Omit<SwitchProps, "name" | "onChange" | "value"> & {
  name: string;
  helperText?: React.ReactNode;
  label: string;
  info: string;
};

export function FormSwitch({ name, defaultValue = "", label, id, info, helperText, ...rest }: FormSwitchProps) {
  const { control, errors } = useFormContext();
  const error = get(errors, name);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ value, onChange }) => (
        <FormControl error={!!error} component="fieldset" fullWidth variant="filled">
          <FormLabel error={!!error} component="legend" id={`${id}-label`}>
            {label}
          </FormLabel>
          <FormControlLabel
            label={info}
            labelPlacement="end"
            control={<Switch color="primary" id={id} value={value} onChange={onChange} {...rest} />}
          />
          {(error?.message ?? helperText) && (
            <FormHelperText variant="filled" error={!!error}>
              {error?.message ?? helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
