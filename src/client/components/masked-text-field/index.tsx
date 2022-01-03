import type { ComponentPropsWithoutRef } from "react";
import { get, useController } from "react-hook-form";

import { TextField, FilledTextFieldProps } from "@mui/material";
import { useRifm, Rifm } from "rifm";

interface TextFieldProps extends Omit<FilledTextFieldProps, "variant" | "onChange" | "value"> {
  name: string;
  rifm: Omit<ComponentPropsWithoutRef<typeof Rifm>, "value" | "onChange" | "children">;
}

export function MaskedTextField({ name, helperText, rifm, ...rest }: TextFieldProps) {
  const {
    field,
    formState: { errors },
  } = useController({ name });
  const { onChange, value } = useRifm({ onChange: field.onChange, value: field.value, ...rifm });
  const error = get(errors, name);

  const { ref, ...form } = field;

  return (
    <TextField
      inputRef={ref}
      {...form}
      onChange={onChange}
      value={value}
      error={!!error}
      helperText={error?.message ?? helperText}
      {...rest}
    />
  );
}
