import * as React from "react";
import { useFormContext, get } from "react-hook-form";

import { Control } from "../../form";

interface FormControlProps extends Omit<React.ComponentProps<typeof Control>, "ref" | "name" | "error"> {
  name: string;
}

export function FormControl({ name, helperText, ...rest }: FormControlProps) {
  const { register, errors } = useFormContext();
  const message = get(errors, `${name}.message`, helperText);

  return <Control ref={register} name={name} error={!!errors[name]} helperText={message} {...rest} />;
}
