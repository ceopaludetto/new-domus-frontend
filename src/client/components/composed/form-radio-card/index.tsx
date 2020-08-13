import * as React from "react";
import { useFormContext, get } from "react-hook-form";

import { RadioCard } from "../../form";

interface FormRadioCardProps extends Omit<React.ComponentProps<typeof RadioCard>, "ref" | "name" | "error"> {
  name: string;
}

export function FormRadioCard({ name, ...rest }: FormRadioCardProps) {
  const { register, errors } = useFormContext();
  const error = get(errors, name);

  return <RadioCard ref={register} name={name} error={!!error} {...rest} />;
}
