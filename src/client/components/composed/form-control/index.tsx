import * as React from "react";
import { useFormContext, get } from "react-hook-form";

import { Control } from "../../form";

interface FormControlProps extends Omit<React.ComponentProps<typeof Control>, "ref" | "name" | "error"> {
  name: string;
  array?: boolean;
}

export function FormControl({ name, helperText, array = false, ...rest }: FormControlProps) {
  const { register, errors } = useFormContext();
  const error = get(errors, name);

  return (
    <Control
      ref={array ? register() : register}
      name={name}
      error={!!error}
      helperText={error?.message ?? helperText}
      {...rest}
    />
  );
}
