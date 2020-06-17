import * as React from "react";
import { useFormContext, ErrorMessage, Controller } from "react-hook-form";

import { Rifm } from "rifm";

import { Control } from "../../form";

interface MaskedFormControlProps extends Omit<React.ComponentProps<typeof Control>, "ref" | "name" | "error"> {
  name: string;
  rifm: Omit<React.ComponentProps<typeof Rifm>, "value" | "onChange" | "children">;
}

export function MaskedFormControl({ name, helperText, rifm, ...rest }: MaskedFormControlProps) {
  const { control, errors } = useFormContext();
  const message = errors[name] ? <ErrorMessage errors={errors} name={name} /> : helperText;

  return (
    <Controller
      as={
        <Rifm value="" onChange={() => {}} {...rifm}>
          {({ onChange, value }) => (
            <Control
              onChange={onChange}
              value={value}
              name={name}
              error={!!errors[name]}
              helperText={message}
              {...rest}
            />
          )}
        </Rifm>
      }
      control={control}
      name={name}
      {...rifm}
    />
  );
}
