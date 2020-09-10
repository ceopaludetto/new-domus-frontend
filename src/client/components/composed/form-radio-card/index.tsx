import * as React from "react";
import { useFormContext, get, Controller } from "react-hook-form";

import { RadioGroup, RadioGroupProps, FormControl, FormHelperText } from "@material-ui/core";

interface FormRadioCardProps extends Omit<RadioGroupProps, "name" | "value" | "error" | "onChange"> {
  helperText?: string;
  name: string;
}

export function FormRadioCard({ name, defaultValue = "", helperText, children, ...rest }: FormRadioCardProps) {
  const { errors, control } = useFormContext();
  const error = get(errors, name);

  return (
    <FormControl fullWidth error={!error}>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        as={
          <RadioGroup name={name} {...rest}>
            {children}
          </RadioGroup>
        }
      />
      {(error?.message ?? helperText) && (
        <FormHelperText error={!!error}>{error?.message ?? helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
