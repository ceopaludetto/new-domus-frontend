import { useRef } from "react";
import { useFormContext, get } from "react-hook-form";
import { useEffectOnce } from "react-use";

import { TextField, TextFieldProps } from "@material-ui/core";

import { merge } from "@/client/utils/merge.refs";

interface FormControlProps extends Omit<TextFieldProps, "inputRef" | "name" | "error"> {
  name: string;
}

export function FormControl({ name, helperText, variant = "outlined", autoFocus, ...rest }: FormControlProps) {
  const innerRef = useRef<HTMLInputElement>(null);
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, name);

  useEffectOnce(() => {
    if (innerRef.current && autoFocus) {
      innerRef.current.focus();
    }
  });

  const { ref, ...form } = register(name);

  return (
    <TextField
      inputRef={merge([ref, innerRef])}
      error={!!error}
      helperText={error?.message ?? helperText}
      variant={variant}
      {...form}
      {...rest}
    />
  );
}
