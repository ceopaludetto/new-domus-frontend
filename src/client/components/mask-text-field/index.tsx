import type { ComponentPropsWithoutRef } from "react";
import { useController, get } from "react-hook-form";

import { TextField } from "@material-ui/core";
import { Rifm, useRifm } from "rifm";

interface MaskTextFieldProps extends Omit<ComponentPropsWithoutRef<typeof TextField>, "value" | "onChange"> {
  id: string;
  name: string;
  rifm: Omit<ComponentPropsWithoutRef<typeof Rifm>, "value" | "onChange" | "children">;
}

export function MaskTextField({ name, rifm, helperText, ...rest }: MaskTextFieldProps) {
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
