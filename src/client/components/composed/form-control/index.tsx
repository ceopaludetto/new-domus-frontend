import * as React from "react";
import { useFormContext, ErrorMessage } from "react-hook-form";

import { Control } from "../../form";

interface FormControlProps extends Omit<React.ComponentProps<typeof Control>, "ref" | "name" | "error"> {
  name: string;
}

export function FormControl({ name, helperText, ...rest }: FormControlProps) {
  const { register, errors } = useFormContext();
  const message = errors[name] ? <ErrorMessage errors={errors} name={name} /> : helperText;

  return <Control ref={register} name={name} error={!!errors[name]} helperText={message} {...rest} />;
}
