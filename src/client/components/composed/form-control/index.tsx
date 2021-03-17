import * as React from "react";
import { useFormContext, get } from "react-hook-form";
import { useEffectOnce } from "react-use";

import { TextField, TextFieldProps } from "@material-ui/core";

import { merge } from "@/client/utils/merge.refs";

interface FormControlProps extends Omit<TextFieldProps, "inputRef" | "name" | "error"> {
  name: string;
  array?: boolean;
}

export function FormControl({
  name,
  helperText,
  array = false,
  variant = "outlined",
  autoFocus,
  ...rest
}: FormControlProps) {
  const innerRef = React.useRef<HTMLInputElement>(null);
  const { register, errors } = useFormContext();
  const error = get(errors, name);

  useEffectOnce(() => {
    if (innerRef.current && autoFocus) {
      innerRef.current.focus();
    }
  });

  return (
    <TextField
      inputRef={merge([array ? register() : register, innerRef])}
      name={name}
      error={!!error}
      helperText={error?.message ?? helperText}
      variant={variant}
      {...rest}
    />
  );
}
