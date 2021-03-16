import * as React from "react";
import { useFormContext, get } from "react-hook-form";

import { TextField, TextFieldProps } from "@material-ui/core";

interface FormControlProps extends Omit<TextFieldProps, "inputRef" | "name" | "error"> {
  name: string;
  array?: boolean;
}

export function FormControl({ name, helperText, array = false, variant = "outlined", ...rest }: FormControlProps) {
  const { register, errors } = useFormContext();
  const error = get(errors, name);

  return (
    <TextField
      inputRef={array ? register() : register}
      name={name}
      error={!!error}
      helperText={error?.message ?? helperText}
      variant={variant}
      {...rest}
    />
  );
}
